# Skill: Agregar un módulo de integración con Google Cloud en Munay Map Backend

## Cuándo usar esta skill

Usar cuando necesitás agregar un nuevo servicio de Google Cloud al backend de Munay Map (`backend/`) que necesite el patrón mock/real intercambiable.

Ejemplos: Google Maps API, Cloud Storage, Translate API, etc.

---

## Estructura del patrón (aplicar exactamente igual en los tres módulos existentes)

Cada módulo de servicio externo tiene 4 archivos obligatorios:

```
src/<nombre>/
  <nombre>.service.interface.ts   ← Port (interfaz TypeScript pura)
  <nombre>.service.ts             ← Implementación real (usa SDK de Google)
  <nombre>.service.mock.ts        ← Implementación mock (datos hardcodeados, sin red)
  <nombre>.module.ts              ← Selección por env var
```

---

## Paso a paso

### 1. Crear la interfaz (Port)

```typescript
// src/<nombre>/<nombre>.service.interface.ts
export interface <Nombre>Request {
  // campos del request
}

export interface <Nombre>Result {
  // campos del resultado
}

export interface <Nombre>ServicePort {
  <metodo>(<param>: <Nombre>Request): Promise<<Nombre>Result>;
}
```

### 2. Implementación real

```typescript
// src/<nombre>/<nombre>.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { SdkClient } from '@google-cloud/<paquete>';
import type { <Nombre>ServicePort, <Nombre>Request, <Nombre>Result } from './<nombre>.service.interface';

@Injectable()
export class <Nombre>Service implements <Nombre>ServicePort {
  private readonly logger = new Logger(<Nombre>Service.name);
  private client = new SdkClient();

  async <metodo>(request: <Nombre>Request): Promise<<Nombre>Result> {
    this.logger.log('Calling Google <Nombre>...');
    // Implementación real con el SDK
    // ...
    return result;
  }
}
```

### 3. Implementación mock

```typescript
// src/<nombre>/<nombre>.service.mock.ts
import { Injectable } from '@nestjs/common';
import type { <Nombre>ServicePort, <Nombre>Request, <Nombre>Result } from './<nombre>.service.interface';

@Injectable()
export class <Nombre>ServiceMock implements <Nombre>ServicePort {
  // eslint-disable-next-line @typescript-eslint/require-await
  async <metodo>(_request: <Nombre>Request): Promise<<Nombre>Result> {
    return {
      // datos mock hardcodeados, representativos del caso de uso real
    };
  }
}
```

**Reglas del mock:**
- Siempre retornar datos representativos (no vacíos)
- Usar prefijo `_` en parámetros no usados para satisfacer el linter
- Agregar `// eslint-disable-next-line @typescript-eslint/require-await` antes de métodos async sin await

### 4. Módulo con selección por env var

```typescript
// src/<nombre>/<nombre>.module.ts
import { Module } from '@nestjs/common';
import { <Nombre>Service } from './<nombre>.service';
import { <Nombre>ServiceMock } from './<nombre>.service.mock';

const isMock = process.env.GOOGLE_CLOUD_MOCK_MODE === 'true';

@Module({
  providers: [
    {
      provide: '<Nombre>ServicePort',
      useClass: isMock ? <Nombre>ServiceMock : <Nombre>Service,
    },
  ],
  exports: ['<Nombre>ServicePort'],
})
export class <Nombre>Module {}
```

### 5. Registrar en AppModule

```typescript
// src/app.module.ts
import { <Nombre>Module } from './<nombre>/<nombre>.module';

@Module({
  imports: [
    // ...módulos existentes
    <Nombre>Module,
  ],
})
export class AppModule {}
```

### 6. Consumir en otro módulo

```typescript
// Inyectar por token string en el constructor:
constructor(
  @Inject('<Nombre>ServicePort') private readonly <nombre>Service: <Nombre>ServicePort,
) {}
```

Y en el módulo consumidor, importar el módulo:

```typescript
@Module({
  imports: [<Nombre>Module],
  // ...
})
```

### 7. Verificar lint y build

```bash
npm run lint
npm run build
```

Errores comunes:
- `@typescript-eslint/require-await` → agregar `// eslint-disable-next-line @typescript-eslint/require-await`
- `no-unused-vars` para parámetros no usados → prefijo `_`

---

## Variables de entorno

- `GOOGLE_CLOUD_MOCK_MODE=true` → usa el mock (desarrollo, CI)
- `GOOGLE_CLOUD_MOCK_MODE=false` + credenciales → usa el servicio real

Credenciales reales (solo en producción):
```
GOOGLE_CLOUD_PROJECT_ID=tu-proyecto
GOOGLE_APPLICATION_CREDENTIALS=/path/a/service-account.json
GEMINI_API_KEY=tu-clave  # solo para Gemini
```

---

## Módulos existentes de referencia

| Módulo | Paquete NPM | Token | Método principal |
|---|---|---|---|
| `VisionModule` | `@google-cloud/vision` | `VisionServicePort` | `analyzeImage(imageBase64)` |
| `GeminiModule` | `@google/genai` | `GeminiServicePort` | `generateExplanation(req)`, `chat(req)` |
| `TtsModule` | `@google-cloud/text-to-speech` | `TtsServicePort` | `synthesize(req)` |
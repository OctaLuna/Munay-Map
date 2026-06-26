/**
 * boliviaMask.ts — Silueta de Bolivia para el hero principal
 *
 * PLACEHOLDER — Este path es una forma aproximada.
 * Para reemplazar por el contorno real de Bolivia:
 *   1. Obtener un SVG oficial del contorno de Bolivia
 *   2. Extraer el atributo `d` del elemento <path>
 *   3. Pegarlo en BOLIVIA_MASK_PATH abajo
 *   4. Si el viewBox del SVG original es distinto a "0 0 1000 700",
 *      actualizar también MASK_VIEWBOX
 *   5. NO se necesita tocar el componente CountryMaskHero
 *
 * Bolivia tiene una forma característica: ancha en el norte (Beni/Pando),
 * con un entrante por el oeste (Atacama), y una punta sur hacia Argentina.
 */

export const MASK_VIEWBOX = '0 0 1000 700'

/**
 * Path placeholder que simula la silueta de Bolivia.
 * Forma aproximada con los rasgos distintivos del país:
 * - Ancho superior (altiplano norte)
 * - Indentación oeste (salida al mar perdida)
 * - Punta sur hacia Argentina
 */
export const BOLIVIA_MASK_PATH =
  'M 320 60 ' +
  'C 380 45, 480 40, 560 55 ' +
  'C 640 70, 700 90, 740 120 ' +
  'C 780 150, 800 190, 810 240 ' +
  'C 820 290, 810 340, 790 375 ' +
  'C 770 410, 740 430, 710 450 ' +
  'C 750 470, 760 510, 750 545 ' +
  'C 740 580, 710 610, 670 625 ' +
  'C 630 640, 580 645, 540 640 ' +
  'C 490 635, 450 620, 420 600 ' +
  'C 390 580, 370 555, 360 530 ' +
  'C 350 505, 355 480, 365 460 ' +
  'C 330 445, 295 425, 270 400 ' +
  'C 240 370, 225 330, 220 290 ' +
  'C 215 245, 225 200, 245 165 ' +
  'C 265 130, 295 90, 320 60 Z'

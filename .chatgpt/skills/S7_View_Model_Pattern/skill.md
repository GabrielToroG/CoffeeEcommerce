# SKILL: S7 - Pattern: Screen-View-Hook (ViewModel)

## Propósito
Evitar que los archivos JSX crezcan descontroladamente y separar la lógica de renderizado de la lógica de estado.

## Estructura de Triada
1. **Screen (`*Screen.tsx`)**: El orquestador. Llama al Hook y pasa los datos a la View.
2. **View (`*View.tsx`)**: Componente "tonto" (Presentational). Recibe todo por props. Facilita el testeo visual.
3. **Hook (`use*Hook.ts`)**: El "ViewModel". Maneja estados de Ionic, formularios y dispara casos de uso del dominio.

## Regla de Oro
La `View` no debe tener estados complejos (`useState`) ni efectos (`useEffect`) que disparen lógica de negocio. Todo eso vive en el `Hook`.
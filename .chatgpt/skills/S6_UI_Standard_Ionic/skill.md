# SKILL: S6 - Estándares de UI e Ionic React

## Componentes Nativos
Priorizar componentes de **Ionic React** (`IonButton`, `IonContent`, etc.) sobre HTML nativo. El uso de `div` o `button` debe estar justificado técnicamente.

## Excepción HTML Justificada
Si no existe un componente de Ionic adecuado, o si el componente de Ionic introduce un comportamiento no deseado para el layout, accesibilidad o semántica requerida, se permite usar HTML nativo.

Cuando esto ocurra, el código debe dejar un comentario breve junto al elemento HTML explicando por qué no se usó Ionic.

Ejemplo:
```tsx
{/* HTML nativo: IonTitle altera el layout dentro de este flex header. */}
<div className="desktop-top-header__brand">
  ...
</div>
```

## Analogía de Composición (Swift Style)
- **Screen**: Pantalla principal montada en el router.
- **View**: Secciones visuales grandes extraídas de la Screen (como extensiones en Swift).
- **Regla**: La `Screen` debe mantenerse limpia y compositiva, delegando la complejidad visual a las `Views` en `presentation/components/`.

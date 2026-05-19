import { IonButton, IonIcon } from '@ionic/react';
import { moonOutline, sunnyOutline } from 'ionicons/icons';
import { useTheme } from '../../../../theme/ThemeProvider';
import './ThemeToggleButtonView.css';

type ThemeToggleButtonViewProps = {
  className?: string;
};

export function ThemeToggleButtonView({ className }: ThemeToggleButtonViewProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <IonButton
      type="button"
      fill="clear"
      className={`theme-toggle-button ${className ?? ''}`.trim()}
      onClick={toggleTheme}
      aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
      title={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
    >
      <IonIcon icon={isDark ? sunnyOutline : moonOutline} aria-hidden="true" />
    </IonButton>
  );
}

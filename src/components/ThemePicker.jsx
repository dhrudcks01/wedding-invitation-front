function ThemePicker({ themes, currentTheme, onChange }) {
  return (
    <div className="theme-picker" role="group" aria-label="색상 테마">
      <span className="theme-label">컬러</span>
      {themes.map((themeOption) => (
        <button
          key={themeOption.key}
          className={`theme-dot theme-dot--${themeOption.key} ${currentTheme === themeOption.key ? 'active' : ''}`}
          onClick={() => onChange(themeOption.key)}
          aria-label={`${themeOption.label} 테마`}
          type="button"
        />
      ))}
    </div>
  );
}

export default ThemePicker;

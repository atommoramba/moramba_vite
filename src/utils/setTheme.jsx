export default function setTheme({ Theme }) {
  const root = document.documentElement;
  const themeMap = {
    Dark: {
      "--BodyBackgroundColor": "#1a120b",
      "--backgroundColor": "#ffffff",
      "--ContainerColor": "#e5e5cb",
      "--TextDarkColor": "#fff",
      "--TextColor": "#000",
      "--PopupBackGroundColor": "#495464",
      "--PopupTextColor": "#ffffff",
      "--SaveButtonColor": "#019267",
      "--CancleButtonColor": "#ff9292",
      "--CreateButtonColor": "#6d9886",
      "--ActiveButtonColor": "#ecfdf3",
      "--DeactiveButtonColor": "#fdecec",
      "--DeactiveBtnTextColor": "#7a0202",
      "--ActiveBtnTextColor": "#207a48",
      "--SelectCompanyBox": "#e5e5cb",
      "--CmpText": "#000",
    },
    Light: {
      "--BodyBackgroundColor": "#ffffff",
      "--backgroundColor": "#ffffff",
      "--ContainerColor": "#f0fbff",
      "--TextDarkColor": "#393e46",
      "--TextColor": "#ffffff",
      "--PopupBackGroundColor": "#495464",
      "--PopupTextColor": "#ffffff",
      "--SaveButtonColor": "#019267",
      "--CancleButtonColor": "#ff9292",
      "--CreateButtonColor": "#6d9886",
      "--ActiveButtonColor": "#ecfdf3",
      "--DeactiveButtonColor": "#fdecec",
      "--DeactiveBtnTextColor": "#7a0202",
      "--ActiveBtnTextColor": "#207a48",
      "--SelectCompanyBox": "#d6e4e5",
      "--CmpText": "#000",
    },
  };

  Object.entries(themeMap[Theme]).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
}

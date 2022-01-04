const AndroidRegExp = /Android/i
const MacOSRegExp = /Mac/i
const IOSRegExp= /iPad|iPhone|iPod/i


export const usePlatform = () => {
  const { platform, userAgent } = window.navigator

  return {
    isIOS: IOSRegExp.test(platform),
    isMacOS: MacOSRegExp.test(platform),
    isAndroid: AndroidRegExp.test(userAgent),
  }
}
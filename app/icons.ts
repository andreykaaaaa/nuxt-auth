type IconsInnerType = { [name: string]: string };
const prepareIconsType = <T extends IconsInnerType>(config: T): T => config;

const icons = prepareIconsType({
  Snowman: 'fluent-emoji-flat:snowman',
  Santa: 'emojione:santa-claus-medium-skin-tone'
});

export type IconsType = keyof typeof icons;
export default icons;

import { HandledRoute, logWarn, registerPlugin, scullyConfig, createFolderFor, getMyConfig } from '@scullyio/scully';
import { readdirSync } from 'fs';
import { join } from 'path';
import { generate } from 'critical';

export const criticalCSS = 'criticalCss' as const;

export interface CriticalCSSSettings {
  /** inline images into the pages when smaller then 10240 bytes */
  inlineImages?: boolean;
  /** Width of the target viewport */
  width?: number;
  /** Height of the target viewport */
  height?: number;
  /** An array of objects containing height and width. Takes precedence over width and height if set */
  dimensions?: {
    width: number;
    height: number;
  }[];
  /** An array with fully qualified paths to assets, if none is given, the root, and the root/assets will be used to look for static assets*/
  assets?: string[];
  /** Ignore some css rules, see https://github.com/addyosmani/critical#critical*/
  ignore?: {
    atrule?: string[];
    rule?: string[];
    decl?: (node: any, value: any) => boolean;
  };

}


const defaultSettings: CriticalCSSSettings = {
  inlineImages: true,
  width: 1800,
  height: 1400
};

const criticalCssPlugin = async (incomingHtml: string, route: HandledRoute) => {
  try {
    const settings: CriticalCSSSettings = Object.assign({}, defaultSettings, getMyConfig(criticalCssPlugin));
    const css = getStyleFiles(scullyConfig.distFolder || '').map(file => file.replace(scullyConfig.distFolder || '', ''));
    const assetPaths = settings.assets ? settings.assets : [scullyConfig.outDir, join(scullyConfig.outDir || '', '/assets')];
    const crSettings = {
      html: incomingHtml,
      /** we need to base, as it uses it to _read_ the css */
      base: scullyConfig.outDir?.toString(),
      /** we parse all the css files found in the dist folder, as we don't know where the dev has put the relevant css for this page. */
      css,
      /** try to read the assets for inlining here */
      assetPaths,
      /** we can't extract, as we don't know what the SPA might need */
      extract: false,
      /** do _not_ rebase, as we are not changing any locations. */
      rebase: () => undefined,
      /** this should be configurable */
      inlineImages: false, // settings.inlineImages, // This is not working, so we disable it for now.
      height: settings.height,
      width: settings.width,
      /** the options for the inline tool. there is no use in user-setting those. */
      inline: {
        /*  we want to add teh preload tags as that makes the CSS loading lazy */
        preload: true,
        /** we will minify the inlined css */
        minify: true
      },
      ignore: settings.ignore
    } as any;
    /** dimensions overpower the width/height settings, only set if indeed provided. */
    if (settings.dimensions) {
      crSettings.dimensions = settings.dimensions;
    }
    const { html } = await generate(crSettings);
    return html;
  } catch (e) {
    logWarn(`route: "${route.route}" could not inline CSS`, e);
  }
  return incomingHtml;
};
registerPlugin('postProcessByHtml', criticalCSS, criticalCssPlugin);

function getStyleFiles(path: string): string[] {
  const entries = readdirSync(path, { withFileTypes: true });
  const folders = entries.filter(folder => folder.isDirectory());
  const files = entries.filter(file => !file.isDirectory() && file.name.endsWith('.css')).map(file => join(path, file.name));
  for (const folder of folders) {
    const newPath = `${path}/${folder.name}`;
    files.push(...getStyleFiles(newPath));
  }
  return files;
}

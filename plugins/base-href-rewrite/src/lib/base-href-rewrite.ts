  import { getMyConfig, HandledRoute, logOk, registerPlugin, setMyConfig, yellow } from '@scullyio/scully';
interface BaseHrefRewriteConfig {
  href: string;
  baseHrefPredicate?: (html: string, route: HandledRoute) => boolean;
}
export const baseHrefRewrite = 'baseHrefRewrite' as const;

const baseHrefRewritePlugin = async (html: string, route: HandledRoute): Promise<string> => {
  let { href } = getMyConfig<BaseHrefRewriteConfig>(baseHrefRewritePlugin);
  /** if there is a predicate and it returns falsy, don't do anything */
  if (route.config?.baseHrefPredicate && !route.config?.baseHrefPredicate(html, route)) {
    return html as string;
  }
  if (route.config?.baseHref && typeof route.config?.baseHref === 'string') {
    href = route.config.baseHref;
  }

  logOk(`Rewritten 'base href' to ${yellow(href)}, for route: ${yellow(route.route)}`);
  if (!html.toLowerCase().includes('<base')) {
    /** there is none, just add one. */
    return html.replace(/<\/head[\s>]/i, `<base href="${href}"></head>`) as string;
  }
  return html.replace(/(<base.*href=['"])(.*)(['"])/gi, `$1${href}$3`) as string;
};

setMyConfig(baseHrefRewritePlugin, {
  href: '/',
});

registerPlugin('postProcessByHtml', baseHrefRewrite, baseHrefRewritePlugin);

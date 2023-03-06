const headEndTag = `</head>`;

export async function appendToHead(html: string, str: string) {
  const indexOfFirstHeadClose = html.indexOf(headEndTag);
  const start = html.slice(0, indexOfFirstHeadClose);
  const end = html.slice(indexOfFirstHeadClose);
  return `${start}${str}${end}`;
}

const render = (content) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Deno Oak Example</title>
    </head>
    <body>
      <h1>${content}</h1>
    </body>
  </html>
`;

export default render;

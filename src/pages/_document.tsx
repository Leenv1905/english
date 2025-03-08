import Document, { Html, Head, Main, NextScript } from 'next/document';
// TỆP NÀY LÀ 1 CÁCH ĐỂ THÊM FONT
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
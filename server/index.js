const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

const fs = require("fs");
const multer = require("multer");

app.use(express.json());

const storage = multer.diskStorage({
  // ファイルの保存先を指定
  destination: function(req, file, cb) {
    cb(null, "server/output");
  },
  // ファイル名を指定(オリジナルのファイル名を指定)
  filename: function(req, file, cb) {
    //　Math.random().toString(36).slice(-9)で乱数を生成
    // const imageName = `${Math.random()
    //   .toString(36)
    //   .slice(-9)}_${Date.now()}.txt`;
    const imageName = file.originalname;
    cb(null, imageName);
  }
});

const upload = multer({
  storage: storage
}).single("file");

app.post("/upload", (req, res) => {
  let data = {
    hoge: 100,
    foo: 'a',
    bar: true,
  };

  fs.writeFile('server/output/usr' + req.body.id + '.json', JSON.stringify(req.body, null, '    '), (err) => {
    if (err) {
      return res.status(500).send("エラーが発生しました");
    } else {
      return res.status(200).send("ファイルが正常に書き出しされました");
    }
  });


  // upload(req, res, err => {
  //   if (err) {
  //     //アップロード失敗した場合
  //     res.json({
  //       status: "error",
  //       error: "fail to uplord image"
  //     });
  //   } else {
  //     //アップロード成功した場合
  //     res.json({
  //       status: "sucess",
  //       // ファイル名を返す
  //       path: res.req.file.filename
  //     });
  //   }
  // });
});

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()

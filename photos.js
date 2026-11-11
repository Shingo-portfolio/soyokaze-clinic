// 写真を差し込む処理。写真は img フォルダに置いた見本用の素材です（Unsplash の無料写真と、Figma AI で作った実在しない人物の写真。CREDITS.md 参照）。
// ph("hero.jpg") のようにファイル名を渡すと <img> を返します。
function ph(file) {
  return `<img class="ph" src="img/${file}" alt="" loading="lazy" decoding="async">`;
}

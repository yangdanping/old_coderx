import { cache, Msg } from '@/utils';
import store from '@/store';
let uploaded = [];
import {
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Link,
  Image,
  Iframe,
  CodeBlock,
  Blockquote,
  TodoItem,
  TodoList,
  TextAlign,
  FontSize,
  FontType,
  SelectAll,
  Fullscreen,
  Print,
  Preview,
  TextHighlight,
  TextColor,
  FormatClear,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  History,
  TrailingNode,
  HardBreak,
  HorizontalRule,
  LineHeight,
  Indent
} from 'element-tiptap';
import { uploadPicture } from '@/service/file/file.request.js';
uploadPicture();
const extensions = [
  new Doc(),
  new Text(),
  new Paragraph(),
  new Heading({ level: 6 }),
  new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
  new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
  new Italic(),
  new Strike(),
  new ListItem(),
  new BulletList(),
  new OrderedList(),
  new Link(),
  // new Image(),
  new Image({
    async uploadRequest(file) {
      const fd = new FormData();
      fd.append('picture', file);
      const res = await uploadPicture(fd);
      if (res.code === 0) {
        console.log('上传图片成功!', res);
        console.log('获取到了上传的图片', res.data[0].url);
        const imgId = res.data[0].result.insertId;
        // uploaded.push(id);
        store.commit('a/changeUploaded', imgId);
        // if (!cache.getCache('pictures')) {
        //   console.log('没有pictures本地缓存,创建一个pictures本地缓存');
        //   uploaded.push(id);
        //   cache.setCache('pictures', uploaded);
        //   console.log(cache.getCache('pictures'));
        // } else {
        //   console.log('已有本地缓存,则直接加入');
        //   uploaded.push(id);
        //   cache.setCache('pictures', uploaded);
        //   console.log(cache.getCache('pictures'));
        // }
        return res.data[0].url;
      } else {
        Msg.showFail('图片上传失败');
        return '图片上传失败';
      }
    }
  }),
  // {
  // 默认会把图片生成 base64 字符串和内容存储在一起，如果需要自定义图片上传
  // uploadRequest(file) {
  //   如果接口要求 Content-Type 是 multipart/form-data，则请求体必须使用 FormData
  // const fd = new FormData()
  //   fd.append('picture', file)
  //   第1个 return 是返回 Promise 对象
  //   为什么?因为 axios 本身就是返回 Promise 对象
  //   return uploadImage(fd).then(res => {
  //     // 这个 return 是返回最后的结果
  //     return res.data.data.url
  //   })
  // } // 图片的上传方法，返回一个 Promise<url>
  // }
  new Iframe(),
  new CodeBlock(),
  new Blockquote(),
  new TodoItem(),
  new TodoList(),
  new TextAlign(),
  new FontSize(),
  new FontType(),
  new SelectAll(),
  new Fullscreen(),
  new Print(),
  new Preview(),
  new TextHighlight(),
  new TextColor(),
  new FormatClear(),
  new Table({ resizable: true }),
  new TableHeader(),
  new TableCell(),
  new TableRow(),
  new History(),
  new TrailingNode(),
  new HardBreak(),
  new HorizontalRule(),
  new LineHeight(),
  new Indent()
];
const commentExt = [
  new Doc(),
  new Text(),
  new Paragraph(),
  new Heading({ level: 6 }),
  new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
  new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
  new Italic(),
  new ListItem(),
  new BulletList(),
  new OrderedList(),
  new CodeBlock(),
  new Blockquote(),
  new TextAlign(),
  new FontSize(),
  new FontType(),
  new HorizontalRule(),
  new Preview()
];
export { extensions, commentExt };

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'vue-quill-editor' {
  // @ts-ignore
  import VueQuillEditor from 'vue-quill-editor'
  export default VueQuillEditor
}

declare module 'vue-moment' {
  // @ts-ignore
  import VueMoment from 'vue-moment'
  export default VueMoment;
}

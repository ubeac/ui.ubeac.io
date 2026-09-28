<template>
  <ComponentContainer class="component-file-uploader">
    <template v-if="fileType == 'file'">
      <div
        :class=" { 'simple-file-uploader--empty': !prefill } "
        class="simple-file-uploader">
        <b-btn
          class="simple-file-uploader--upload-icon"
          variant="outline-primary"
          size="lg">
          <icon name="upload"/>
        </b-btn>
        <div class="simple-file-uploader--input-container">
          <input
            id="file_input1"
            ref="fileInput"
            type="file"
            placeholder="Produt"
            @change="onUpload">
        </div>
        <div class="simple-file-uploader--text">
          <div v-if="loading">
            {{ $t("file.uploading") }}
          </div>
          <div v-if="!loading && prefill">
            {{ prefill }}
          </div>
          <div v-if="!loading && prefillUploaded">
            {{ prefillUploaded }}
          </div>
          <div v-else>
            {{ $t("file.choose_or_drag") }}
          </div>
        </div>
        <div class="simple-file-uploader--button-group">
          <a
            v-b-tooltip
            v-if="prefill || prefillUploaded"
            :title="$t('general.download')"
            :href="prefill ? prefill : prefillUploaded"
            class="btn btn-outline-primary p-0 simple-file-uploader--view-file"
            disabled
            download >
            <icon name="download-file"/>
          </a>
        </div>
      </div>
    </template>
    <template v-if="fileType == 'image'">
      <div class="component-file-uploader-image">
        <div class="file-uploader--image">
          <input
            id="file_input"
            ref="fileInput"
            type="file"
            placeholder="Produt"
            @change="onUpload">
          <img
            :class=" { 'component-file-uploader--empty': prefillUploaded === false && !prefill } "
            :src="prefill ? prefill : prefillUploaded"
            class="file-uploader--image-file">
          <div :class=" { 'image-loading': loading } "/>
        </div>
      </div>
      <b-button
        :class="{'btn-loading':loading}"
        variant="outline-success"
        class="mt-2 mr-2 float-left simple-file-uploader--change"
        @click="onChangeClick">
        <span v-if="prefillUploaded === false ">
          {{ $t("buttons.choose_image") }}
        </span>
        <span v-else>
          {{ $t("buttons.change_image") }}
        </span>
      </b-button>
    </template>
  </ComponentContainer>
</template>
<script>
import PictureInput from 'vue-picture-input'
import Config from '@/config/config'
// TODO: need review
export default {
  name: 'FileUploader',
  components: {
    PictureInput
  },
  props: {
    value: {
      type: String,
      required: false,
      default: null
    },
    prefillOptions: {
      type: Object,
      required: false,
      default: null
    },
    model: {
      type: String,
      required: false,
      default: null
    },
    fileType: {
      type: String,
      required: false,
      default: 'image'
    }
  },
  data () {
    return {
      firstTimeUploaded: false,
      customStrings: {
        remove: 'x',
        drag: '<icon name="upload"/><br>Drag an image or <br>click here to select a file'
      },
      loading: false,
      prefillUploaded: false,
      imageDefault: '/static/img/logo.png'
    }
  },
  computed: {
    prefill () {
      return this.returnFileUrl(this.value)
    }
  },
  methods: {
    onChangeClick () {
      this.$refs.fileInput.click()
    },
    returnAvatarUrl (id, base) {
      if (id && id !== 'undefined' && id !== '00000000-0000-0000-0000-000000000000') {
        return `${Config.apiServerUrl}File/Download/${id}`
      } else {
        return `${base}avatars/default.svg`
      }
    },
    returnImageUrl (id, base) {
      if (id && id !== 'undefined' && id !== '00000000-0000-0000-0000-000000000000') {
        return `${Config.apiServerUrl}File/Download/${id}`
      } else {
        return `${base}default-image.jpg`
      }
    },
    returnFileUrl (id) {
      if (id && id !== 'undefined' && id !== '00000000-0000-0000-0000-000000000000') {
        return `${Config.apiServerUrl}File/Download/${id}`
      } else {
        return ''
      }
    },
    startUploading () {
      this.loading = true
      this.$emit('startUploading')
    },
    stopUploading () {
      this.loading = false
      this.$emit('stopUploading')
    },
    onRemove () {
      // TODO: last need remove file from server
      this.$emit('onRemove', { model: this.model })
    },
    // TODO: need review and move url to config
    onUpload () {
      if (this.$refs.fileInput.files.length !== 0) {
        let that = this
        let data = new FormData()
        this.startUploading()
        if (this.fileType === 'image') {
          data.append('file', this.$refs.fileInput.files[0])
        } else {
          data.append('file', this.$refs.fileInput.files[0])
        }
        this.loading = true
        this.$http.post(`${this.Config.apiServerUrl}File/Upload`, data, {
          headers: {
            'X-File-Name': 'newFile',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(response => {
          that.firstTimeUploaded = true
          that.prefillUploaded = that.returnFileUrl(response.body.data.id)
          that.$emit('onUpload', { id: response.body.data.id, model: that.model })
          that.$emit('input', response.body.data.id)
          this.stopUploading()
        })
      }
    }
  }
}
</script>

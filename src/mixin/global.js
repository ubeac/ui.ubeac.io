import Config from '@/config/config'
import Icon from '@/components/icons/Icon'
import FileUploader from '@/components/FileUploader'
import MapFloor from '@/components/map/FloorMap'
import MapGeo from '@/components/map/GeoMap'
import MemberBadge from '@/components/member/MemberBadge'
import Loading from '@/components/Loading'
import Editable from '@/components/Editable'
import DataListNoResult from '@/components/DataListNoResult'
import EntityNotFound from '@/components/EntityNotFound'
import ComponentContainer from '@/components/Container'
import HelpCard from '@/components/HelpCard'
import { mapGetters } from 'vuex'

export default {
  components: {
    HelpCard,
    Icon,
    MapFloor,
    MapGeo,
    MemberBadge,
    Loading,
    Editable,
    DataListNoResult,
    EntityNotFound,
    ComponentContainer
  },
  computed: {
    ...mapGetters({
      browser: 'layout/browser'
    })
  },
  data () {
    return {
      Config: Config,
      imageBaseUrl: '/static/img/'
    }
  },
  methods: {
    getIndexColor (index) {
      let colors = Config.colors
      let out = colors[0]
      if (index > colors.length) {
        out = colors[index - colors.length]
      } else if (colors[index]) {
        out = colors[index]
      }
      return out
    },
    getFileUrl (fileId) {
      return FileUploader.methods.returnFileUrl(fileId, this.imageBaseUrl)
    },
    getAvatarUrl (fileId) {
      return FileUploader.methods.returnAvatarUrl(fileId, this.imageBaseUrl)
    },
    getImageUrl (fileId) {
      return FileUploader.methods.returnImageUrl(fileId, this.imageBaseUrl)
    }
  }
}

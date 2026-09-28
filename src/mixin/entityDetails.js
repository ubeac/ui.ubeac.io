import EntityDetailsHead from '@/components/entity/EntityDetailsHead'
import EntityInfoCard from '@/components/entity/EntityInfoCard'
import EntityNoResult from '@/components/entity/EntityNoResult'
import EntitySensors from '@/components/entity/EntitySensors'
import EntityMembers from '@/components/entity/EntityMembers'
import EntitiesMixin from '@/mixin/entities'
export default {
  mixins: [EntitiesMixin],
  components: { EntityDetailsHead, EntityInfoCard, EntityNoResult, EntitySensors, EntityMembers },
  props: {
    id: {
      type: String,
      default: null,
      required: true
    }
  },
  computed: {
    editUrl () {
      let out = '/' + this.type + '/' + this.id
      return out
    }
  }
}

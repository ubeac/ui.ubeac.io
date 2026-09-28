import validation from '@/decorators/validation'
import successNotification from '@/decorators/successNotification'
import EntityAddMixin from '@/mixin/entityAdd'

export default {
  name: 'GatewayAdd',
  mixins: [EntityAddMixin],
  data () {
    return {
      debounceTimer2: null,
      happyUrl: false,
      checkUrlLoading: false,
      isUrlExists: false,
      debounceTimer: false,
      insertItem: {
        name: '',
        description: '',
        floorId: '',
        url: '',
        buildingId: '',
        firmwareId: '',
        x: 50,
        attributes: {
          ui_color: '#000000',
          ui_map_pin: 'MapPinPin',
          ui_map_pin_size: 1,
          ui_icon: 'hdd',
        },
        security: {
          http: {
            ssl: false,
            headers: {}
          },
          ipRestriction: {
            allowedIps: [],
            deniedIps: []
          },
          mqtt: {
            password: null,
            username: null,
            tls:false
          }
        },
        y: 50
      },
      selectedManufacturer: null,
      selectedProduct: null,
      selectedGatewayFirmware: null,
      buildings: null,
      floors: null
    }
  },
  computed: {
    markers () {
      return [{
        id: 'newItem',
        title: this.insertItem.name,
        type: 'gateway',
        obj: this.insertItem,
        pinNum: 1,
        x: 50,
        y: 50
      }]
    },
    currentFloorPlan () {
      let out = ''
      if (this.currentFloor && this.currentFloor.planFileId) {
        out = this.getImageUrl(this.currentFloor.planFileId)
      }
      return out
    },
    currentFloor () {
      let out = null
      out = this.floorById(this.insertItem.floor)
      return out
    }
  },
  watch: {
    insertItem: {
      deep: true,
      handler () {
        this.$emit('updateFirmware', this.insertItem.firmwareId)
      }
    }
  },
  methods: {
    updateMarker (payload) {
      this.insertItem.x = payload.x
      this.insertItem.y = payload.y
    },
    @validation
      @successNotification('Gateway Added Successfully')
    _addGateway (item) {
      const gatewayUpdate = {
        id: item.id,
        name: item.name,
        floorId: item.floor,
        description: item.description,
        attributes: item.attributes,
        firmwareId: item.firmwareId,
        teamId: this.workspaceId,
        url: item.url,
        security: item.security,
        x: item.x,
        y: item.y
      }
      return this.addGateway(gatewayUpdate).then((response) => {
        this.success(response.body.data)
      })
    }
  }
}

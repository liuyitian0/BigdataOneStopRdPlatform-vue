<template>
  <div>
    <div v-for="(item,index) in items" :key="index">
      <div v-for="(val, key) in item" :key="key">
        {{key}} ---> {{val}}
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data (){
    return {
      res : null,
      items: [{"dcl_zssys_web_ply_base":"dw_zssys_web_ply_risk_qust_14"},{"dcl_zssys_web_ply_base":"dw_zssys_web_ply_base_cha_noact"},{"dw_zssys_web_ply_base_cha_noact":"mdp_policy_policy_base"},{"mdp_policy_policy_base":"mdp_salefee_accurued_policy_fee"},{"mdp_policy_policy_base":"mdp_policy_latest_policy_base"},{"mdp_policy_latest_policy_base":"mdp_cusdm_journey"},{"mdp_policy_policy_base":"mdp_objdm_obj_vhl"},{"mdp_objdm_obj_vhl":"mdp_cusdm_asset_details"},{"dcl_zssys_web_ply_base":"dw_zssys_web_ply_tgt_obj_02_noact"}],
    }
  },
  mounted () {
    // const jsondata = require('../public/data/base.json');
  },
  methods: {
    getdata(){
      this.res = jsondata;
    }
  },
}
</script>

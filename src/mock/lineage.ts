const MockLineages = require('mockjs');

MockLineages.mock('api/getLineagesMenuData', 'get', () => ([
  {
    label: 'ODS 层级',
    id: 'source',
    children: [{
      label: '写数据表',
      id: 'source1',
      icon: 'el-icon-coin',
    }, {
      label: '读取文件数据',
      id: 'source2',
      icon: 'el-icon-coin',
    }],
  }, {
    label: 'DCL 层级',
    id: 'preHandle',
    children: [{
      label: 'dcl_zssys_web_ply_base',
      id: 'preHandle1',
      icon: 'el-icon-magic-stick',
    }, {
      label: 'dcl_zssys_web_ply_vhl',
      id: 'preHandle2',
      icon: 'el-icon-magic-stick',
    }, {
      label: 'dcl_zssys_web_prd_cvrg',
      id: 'preHandle3',
      icon: 'el-icon-magic-stick',
    }, {
      label: 'dcl_zssys_web_prd_prod',
      id: 'preHandle4',
      icon: 'el-icon-magic-stick',
    }],
  }, {
    label: 'DW 层级',
    id: 'sign',
    children: [{
      label: 'dw_zssys_web_ply_base_vhl_act',
      id: 'sign1',
    }, {
      label: 'dw_zssys_web_ply_base_vhl_noact',
      id: 'sign2',
    }, {
      label: 'dw_zssys_web_ply_insured_act',
      id: 'sign3',
    }, {
      label: 'dw_zssys_web_ply_ent_tgt_01',
      id: 'sign4',
    }],
  }, {
    label: 'MDP 层级',
    id: 'learn',
    children: [{
      label: 'mdp_policy_policy_base',
      id: 'learn1',
    }, {
      label: 'mdp_mdm_circ_code',
      id: 'learn2',
    }, {
      label: 'mdp_cusdm_vhloneid_claim_dailyincrement',
      id: 'learn3',
    }, {
      label: 'mdp_cusdm_clientoneid_mobile',
      id: 'learn4',
    }, {
      label: 'mdp_cusdm_clientoneid_mobilelog',
      id: 'learn5',
    }, {
      label: 'mdp_objdm_web_ply_ent_tgt_01',
      id: 'learn6',
      icon: 'el-icon-star-off',
    }, {
      label: 'mdp_cusdm_clientoneid_mobile',
      id: 'learn6',
      icon: 'el-icon-star-off',
    }, {
      label: 'mdp_output_report_cus_mutual_num',
      id: 'learn6',
      icon: 'el-icon-star-off',
    }, {
      label: 'abc',
      id: 'learn6',
      icon: 'el-icon-star-off',
    }
    ],
  }]
));

const MockLineages = require('mockjs');


MockLineages.mock('api/getFlowChartData', 'get', () => ({
  nodes: [
    {
      id: 'aaa',
      points: {
        targets: [],
        sources: ['source1', 'source2', 'source10'],
      },
      position: {
        left: 300,
        top: 100,
      },
      data: {
        value: '数据源1',
        icon: 'el-icon-coin',
      },
    },
    {
      id: 'bbb',
      points: {
        targets: ['target1', 'target2', 'target3'],
        sources: ['source3'],
      },
      position: {
        left: 300,
        top: 300,
      },
      data: {
        value: '数据预处理1',
        icon: 'el-icon-magic-stick',
      },
    },
    {
      id: 'ccc',
      points: {
        targets: ['ccc111', 'ccc222'],
        sources: ['ccc333'],
      },
      position: {
        left: 400,
        top: 500,
      },
      data: {
        value: '深度学习1111',
        icon: 'el-icon-coin',
      },
    },
    {
      id: 'ddd',
      points: {
        targets: ['ddd111'],
        sources: ['ddd333', 'ddd222'],
      },
      position: {
        left: 650,
        top: 300,
      },
      data: {
        value: '特征1111',
        icon: 'el-icon-star-off',
        nodeState: 'warning',
      },
    },
  ],
  endpoints: [
    {
      id: 'target1',
      data: {
        value: '输入',
      },
    },
    {
      id: 'target2',
      data: {
        value: '输入1',
      },
    },
    {
      id: 'source1',
      data: {
        value: '输出表1',
      },
    },
    {
      id: 'source2',
      data: {
        value: '输出表2',
      },
    },
    {
      id: 'source3',
      data: {
        value: '输出表',
      },
    },
    {
      id: 'ccc111',
      data: {
        value: '输入c1',
      },
    },
    {
      id: 'ccc222',
      data: {
        value: '输入c2',
      },
    },
    {
      id: 'ccc333',
      data: {
        value: '输出表',
      },
    },
    {
      id: 'source10',
      data: {
        value: '输出表3',
      },
    },
    {
      id: 'target3',
      data: {
        value: '输入3',
      },
    },
    {
      id: 'ddd111',
      data: {
        value: '输入',
      },
    },
    {
      id: 'ddd222',
      data: {
        value: '输出DDD',
      },
    },
    {
      id: 'ddd333',
      data: {
        value: '输出E',
      },
    },
  ],
  edges: ['source1&&target1', 'source2&&target2', 'source3&&ccc111', 'source3&&ccc222'], // 边的对应关系(sourceId -> targetId)
  head: 'aaa',
}));


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

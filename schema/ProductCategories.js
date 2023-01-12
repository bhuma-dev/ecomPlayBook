cube(`ProductCategories`, {
  sql: `SELECT * FROM public.product_categories`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
        Products: {
      relationship: `hasMany`,
      sql: `${Products}.product_category_id = ${ProductCategories}.id`
    }
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, name, createdAt]
    }
  },
  
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    name: {
      sql: `name`,
      type: `string`
    },
    
    createdAt: {
      sql: `created_at`,
      type: `time`
    }
  }
});

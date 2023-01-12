cube(`LineItems`, {
  sql: `SELECT * FROM public.line_items`,
  title: "Sold Items",
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    Products: {
      sql: `${CUBE}.product_id = ${Products}.id`,
      relationship: `belongsTo`
    },
    
    Orders: {
      sql: `${CUBE}.order_id = ${Orders}.id`,
      relationship: `belongsTo`
    }
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, createdAt]
    },
    

     totalAmount: {
      sql: `price`,
      type: `runningTotal`,
      format: `currency`,
    },

    cumulativeTotalRevenue: {
      sql: `price`,
      type: `runningTotal`,
      format: `currency`,
    }
  },
  
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    quantity: {
      sql: `quantity`,
      type: `number`
    },

    price: {
      sql: `price`,
      type: `number`,
      format: `currency`
    },
    createdAt: {
      sql: `created_at`,
      type: `time`
    }
  }
});

cube(`Orders`, {
  sql: `SELECT * FROM public.orders`,
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
    dailyOrdersByCompany: {
      measures: [Orders.count],
      dimensions: [Suppliers.company, Suppliers.id],
      timeDimension: Orders.createdAt,
      granularity: `day`,
      partitionGranularity: `day`,
      refreshKey: {
        every: `1 hour`,
        incremental: true,
        updateWindow: `7 day`
      }
    },
    main: {
      measures: [Orders.count],
      dimensions: [Orders.status],
      timeDimension: Orders.completedAt,
      granularity: `day`
    }
  },
  joins: {
    //  Users: {
    //   sql: `${CUBE}.user_id = ${Users}.id`,
    //   relationship: `belongsTo`
    // },
    Products: {
      sql: `${CUBE}.product_id = ${Products}.id`,
      relationship: `belongsTo`
    },
    LineItems: {
      relationship: `hasMany`,
      sql: `${Orders}.id = ${LineItems}.order_id`
    }
  },
  segments: {
    processingStatusOrders: {
      sql: `status = 'processing'`
    },
    shippedStatusOrders: {
      sql: `status = 'shipped'`
    },
    completedStatusOrders: {
      sql: `status = 'completed'`
    }
  },
  measures: {
    avgordervalue:{
      sql:`${amount}`,
      type : `avg`
    },
    count: {
      type: `count`,
      drillMembers: [id, createdAt]
    },
    number: {
      sql: `number`,
      type: `sum`
    },
    totalAmount: {
      sql: `${amount}`,
      type: `sum`,
      format: `currency`
    }
  },
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    status: {
      sql: `status`,
      type: `string`
    },
    userId: {
      sql: `user_id`,
      type: `number`,
      shown: false
    },
    createdAt: {
      sql: `created_at`,
      type: `time`
    },
    completedAt: {
      sql: `completed_at`,
      type: `time`
    },
    amount: {
      sql: `${LineItems.totalAmount}`,
      type: `number`,
      format: `currency`,
      subQuery: true,
      shown: false
    },
    amountTier: {
      type: `string`,
      case: {
        when: [{
          sql: `${amount} < 100 OR ${amount} is NULL`,
          label: `$0 - $100`
        }, {
          sql: `${amount} >= 100 AND ${amount} < 200`,
          label: `$100 - $200`
        }, {
          sql: `${amount} >= 200`,
          label: `$200 +`
        }],
        else: {
          label: `Unknown`
        }
      }
    }
  }
});
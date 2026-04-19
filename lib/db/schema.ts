import { pgTable, serial, integer, text, real, timestamp } from 'drizzle-orm/pg-core';

export const foodMaster = pgTable('food_master', {
  id:          serial('id').primaryKey(),
  name:        text('name').notNull(),
  category:    text('category').notNull(),
  calories:    real('calories').notNull(),
  protein:     real('protein').notNull(),
  iron:        real('iron').notNull(),
  calcium:     real('calcium').notNull(),
  vitaminC:    real('vitamin_c').notNull(),
  servingSize: text('serving_size'),
});

export const mealRecords = pgTable('meal_records', {
  id:       serial('id').primaryKey(),
  userId:   text('user_id').notNull(),
  foodId:   integer('food_id')
              .references(() => foodMaster.id)
              .notNull(),
  quantity: real('quantity').default(1),
  loggedAt: timestamp('logged_at').defaultNow(),
});

export type FoodMaster    = typeof foodMaster.$inferSelect;
export type MealRecord    = typeof mealRecords.$inferSelect;
export type NewMealRecord = typeof mealRecords.$inferInsert;
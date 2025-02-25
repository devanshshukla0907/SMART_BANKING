import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  creditScore: integer("credit_score").default(0),
  educationProgress: integer("education_progress").default(0),
  kycStatus: text("kyc_status").default("pending"),
  panNumber: text("pan_number"),
  panCardImage: text("pan_card_image"),
  faceImage: text("face_image"),
  kycVerifiedAt: timestamp("kyc_verified_at"),
});

export const loans = pgTable("loans", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  amount: integer("amount").notNull(),
  purpose: text("purpose").notNull(),
  status: text("status").notNull().default("pending"),
  riskScore: integer("risk_score"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const educationModules = pgTable("education_modules", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  moduleName: text("module_name").notNull(),
  completed: boolean("completed").default(false),
  score: integer("score"),
});

export const insertUserSchema = createInsertSchema(users).extend({
  password: z.string().min(8, "Password must be at least 8 characters"),
  fullName: z.string().min(2, "Full name is required"),
});

export const insertLoanSchema = createInsertSchema(loans).omit({ 
  id: true, 
  userId: true,
  riskScore: true,
  createdAt: true 
});

export const kycSchema = z.object({
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Invalid PAN number format. Format should be like 'ABCDE1234F'"),
  panCardImage: z.string().url("Invalid image URL"),
  faceImage: z.string().url("Invalid image URL"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Loan = typeof loans.$inferSelect;
export type EducationModule = typeof educationModules.$inferSelect;
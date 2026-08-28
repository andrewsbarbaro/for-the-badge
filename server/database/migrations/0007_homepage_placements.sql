-- Create homepage_placements table for the pixel grid ad system
CREATE TABLE `homepage_placements` (
	`placement_id` blob PRIMARY KEY NOT NULL,
	`grid_x` integer NOT NULL,
	`grid_y` integer NOT NULL,
	`grid_width` integer NOT NULL,
	`grid_height` integer NOT NULL,
	`owner_name` text NOT NULL,
	`link_url` text,
	`badge_svg` text NOT NULL,
	`stripe_session_id` text,
	`stripe_payment_intent_id` text,
	`amount_paid_cents` integer NOT NULL DEFAULT 0,
	`pixel_count` integer NOT NULL,
	`status` text NOT NULL DEFAULT 'pending',
	`purchased_at` integer,
	`created_at` integer NOT NULL
);--> statement-breakpoint
CREATE UNIQUE INDEX `hp_stripe_session_idx` ON `homepage_placements` (`stripe_session_id`);--> statement-breakpoint
CREATE INDEX `hp_status_idx` ON `homepage_placements` (`status`);--> statement-breakpoint
CREATE INDEX `hp_grid_pos_idx` ON `homepage_placements` (`grid_x`,`grid_y`);--> statement-breakpoint
CREATE INDEX `hp_created_at_idx` ON `homepage_placements` (`created_at`);

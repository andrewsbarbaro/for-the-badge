-- Add owner_query_id column so logged-in buyers can manage their badge board spaces
ALTER TABLE `homepage_placements` ADD COLUMN `owner_query_id` blob;--> statement-breakpoint
CREATE INDEX `hp_owner_query_id_idx` ON `homepage_placements` (`owner_query_id`);

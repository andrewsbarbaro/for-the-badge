/**
 * Open Collective API integration (retired).
 *
 * For the Badge no longer uses Open Collective. These functions are kept as
 * no-op stubs so the /api/donors endpoint and donors page continue to render
 * without errors. If a new donation platform is adopted, replace the stubs
 * with its API client.
 */

export interface OpenCollectiveMember {
    name: string;
    slug: string;
    type: string;
    role: string;
    isActive: boolean;
    totalAmountDonated: number;
    currency: string;
    since: string;
    image: string | null;
    description: string | null;
    publicMessage: string | null;
    tier : {
        name: string;
        slug: string;
    } | null;
}

export interface DonorDisplayInfo {
    name: string;
    slug: string;
    tier: "supporter" | "patron" | "donor";
    totalAmount: number;
    since: Date;
    image: string | null;
    message: string | null;
}

export async function fetchOpenCollectiveMembers() : Promise<OpenCollectiveMember[]>
{
    return [];
}

export async function getDonorsForWall() : Promise<DonorDisplayInfo[]>
{
    return [];
}

export async function getTotalDonorCount() : Promise<number>
{
    return 0;
}

export async function getTotalAmountRaised() : Promise<{ amount: number; currency: string }>
{
    return { amount: 0, currency: "USD" };
}
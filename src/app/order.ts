interface OrderRequest {
    id: number,
    doer: number,
    doer_details: string,
    status: string,
    order: number,
}

export interface Order {
    id: number;
    owner_details: string;
    owner: number;
    request: string;
    doer: string;
    requests: OrderRequest[],
    location: any,
}

interface OrderRequest {
    id: number,
    doer: string,
    status: string,
    order: number,
}

export interface Order {
    id: number;
    request: string;
    doer: number;
    requests: OrderRequest[],
}

export interface AdminRequest {
  id: number;
  employeeId: string;
  employeeName: string;
  assetType: string;
  purpose: string;
  department: string;
  requestDate: string;
  returnDate: string;
  assignedAsset: string;
  status: "pending" | "approved" | "collected" | "overdue" | "closed" | "cancelled" | "hold";
}

export interface Asset {
  id: string;
  type: string;
  description: string;
  status: "available" | "in-use" | "maintenance";
  assignedTo: string;
  location: string;
  purchaseDate: string;
  notes?: string;
}

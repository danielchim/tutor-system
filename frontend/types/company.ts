export default interface Company {
  id: number;
  name: string;
  owner: string;
  registrationDate: string;
  status: 'approved' | 'rejected' | 'pending';
}

import AdminLayout from "./AdminLayout";

export const ComingSoonNew = () => <div className="flex justify-center font-bold mt-10"> Coming Soon... </div>;

export const ComingSoon = () => <AdminLayout children={ComingSoonNew()} />;

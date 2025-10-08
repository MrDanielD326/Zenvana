import AdminLayout from "./AdminLayout";

export const ComingSoonNew = () => <div className="flex justify-center mt-20"> Coming Soon... </div>;

export const ComingSoon = () => <AdminLayout children={ComingSoonNew()} />;

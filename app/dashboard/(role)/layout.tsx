import RoleGuard from "@/guards/role-guard";

export default function Layout({
    children,
    admin,
    admin_reporter,
    partner_reporter,
    bulk_initiator,
    partner_admin,
    bulk_approver,
}: {
    children: React.ReactNode;
    admin_reporter: React.ReactNode
    partner_reporter: React.ReactNode
    bulk_initiator: React.ReactNode
    admin: React.ReactNode
    partner_admin: React.ReactNode
    bulk_approver: React.ReactNode  
}) {
    return (
        <RoleGuard
            admin={admin}
            admin_reporter={admin_reporter}
            partner_reporter={partner_reporter}
            bulk_initiator={bulk_initiator}
            partner_admin={partner_admin}
            bulk_approver={bulk_approver}
        />
    );
}

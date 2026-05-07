import { LoginForm } from "./login-form";

const ERROR_COPY: Record<string, string> = {
  config:
    "This deployment is missing Supabase URL/key or SITE_SLUG. Add them to the environment, then redeploy.",
  forbidden:
    "Your Supabase account signed in, but it is not listed in dw_site_admins for this site’s SITE_SLUG. Another project using the same database will use a different slug — access does not carry over.",
};

export default async function AdminLoginPage(props: {
  searchParams?: Promise<{ next?: string; error?: string }>;
}) {
  const searchParams = props.searchParams
    ? await props.searchParams
    : undefined;
  const nextPath = searchParams?.next;
  const serverAlert = searchParams?.error
    ? (ERROR_COPY[searchParams.error] ??
      `Something went wrong (${searchParams.error}).`)
    : null;
  return (
    <div className="htp-admin htp-admin-shell flex min-h-screen items-center justify-center px-6 py-16">
      <LoginForm nextPath={nextPath} serverAlert={serverAlert} />
    </div>
  );
}

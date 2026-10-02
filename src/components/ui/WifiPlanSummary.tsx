import { wifiPlans } from '../../data/wifiPlans';

export function WifiPlanSummary() {
  return <div className="wifi-mini-plans" aria-label="Ba gói cước chính theo tháng">{wifiPlans.map(plan => <a href="/wifi#pricing" key={plan.id}>
    <strong>{plan.price}<span>k</span></strong><span>{plan.name}</span><small>/ tháng</small>
  </a>)}</div>;
}

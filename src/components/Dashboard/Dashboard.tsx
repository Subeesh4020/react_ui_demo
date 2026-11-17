import React, { useState } from 'react';
import {
    DollarSign,
    Users,
    ShoppingBag,
    Activity,
    ArrowUpRight,
    ArrowDownRight,
    X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

type TimeRange = '7D' | '30D' | '12M';
type MetricType = 'revenue' | 'users';

interface DataPoint {
  label: string;
  revenue: number;
  users: number;
}

interface TrafficSource {
  name: string;
  percentage: number;
  color: string;
}

interface Transaction {
  id: string;
  customer: string;
  plan: string;
  amount: string;
  status: 'Completed' | 'Pending';
  date: string;
}

const ANALYTICS_DATA: Record<
    TimeRange,
    {
        kpis: {
            revenue: { value: string; change: string; up: boolean };
            users: { value: string; change: string; up: boolean };
            orders: { value: string; change: string; up: boolean };
            conversion: { value: string; change: string; up: boolean };
        };
        series: DataPoint[];
        sources: TrafficSource[];
    }
    > = {
    '7D': {
        kpis: {
            revenue: { value: '$12,480', change: '+14.2%', up: true },
            users: { value: '3,842', change: '+8.1%', up: true },
            orders: { value: '412', change: '-2.4%', up: false },
            conversion: { value: '3.64%', change: '+0.4%', up: true },
        },
        series: [
            { label: 'Mon', revenue: 1450, users: 420 },
            { label: 'Tue', revenue: 1820, users: 510 },
            { label: 'Wed', revenue: 1600, users: 480 },
            { label: 'Thu', revenue: 2150, users: 640 },
            { label: 'Fri', revenue: 2490, users: 720 },
            { label: 'Sat', revenue: 1580, users: 550 },
            { label: 'Sun', revenue: 1390, users: 522 },
        ],
        sources: [
            { name: 'Direct Traffic', percentage: 44, color: '#3b82f6' },
            { name: 'Organic Search', percentage: 31, color: '#8b5cf6' },
            { name: 'Social Media', percentage: 16, color: '#10b981' },
            { name: 'Referrals', percentage: 9, color: '#f59e0b' },
        ],
    },
    '30D': {
        kpis: {
            revenue: { value: '$54,920', change: '+18.7%', up: true },
            users: { value: '16,410', change: '+12.5%', up: true },
            orders: { value: '1,890', change: '+6.3%', up: true },
            conversion: { value: '4.12%', change: '+0.8%', up: true },
        },
        series: [
            { label: 'Wk 1', revenue: 11200, users: 3400 },
            { label: 'Wk 2', revenue: 13800, users: 4100 },
            { label: 'Wk 3', revenue: 12900, users: 3950 },
            { label: 'Wk 4', revenue: 17020, users: 4960 },
        ],
        sources: [
            { name: 'Organic Search', percentage: 42, color: '#8b5cf6' },
            { name: 'Direct Traffic', percentage: 35, color: '#3b82f6' },
            { name: 'Social Media', percentage: 15, color: '#10b981' },
            { name: 'Referrals', percentage: 8, color: '#f59e0b' },
        ],
    },
    '12M': {
        kpis: {
            revenue: { value: '$648,300', change: '+32.4%', up: true },
            users: { value: '184,900', change: '+24.9%', up: true },
            orders: { value: '21,450', change: '+19.1%', up: true },
            conversion: { value: '4.45%', change: '+1.2%', up: true },
        },
        series: [
            { label: 'Jan', revenue: 38000, users: 11000 },
            { label: 'Mar', revenue: 44000, users: 13200 },
            { label: 'May', revenue: 51000, users: 15400 },
            { label: 'Jul', revenue: 49000, users: 14800 },
            { label: 'Sep', revenue: 62000, users: 18200 },
            { label: 'Nov', revenue: 74000, users: 21500 },
        ],
        sources: [
            { name: 'Organic Search', percentage: 48, color: '#8b5cf6' },
            { name: 'Direct Traffic', percentage: 29, color: '#3b82f6' },
            { name: 'Referrals', percentage: 13, color: '#f59e0b' },
            { name: 'Social Media', percentage: 10, color: '#10b981' },
        ],
    },
};

const RECENT_TRANSACTIONS: Transaction[] = [
    { id: '#TRX-904', customer: 'Aarav Nair', plan: 'Pro Workspace', amount: '$49.00', status: 'Completed', date: 'Today, 2:14 PM' },
    { id: '#TRX-903', customer: 'Meera Krishnan', plan: 'Enterprise Team', amount: '$199.00', status: 'Completed', date: 'Today, 11:40 AM' },
    { id: '#TRX-902', customer: 'Rohan Verma', plan: 'Starter Plan', amount: '$19.00', status: 'Pending', date: 'Yesterday' },
    { id: '#TRX-901', customer: 'Sneha Menon', plan: 'Pro Workspace', amount: '$49.00', status: 'Completed', date: 'Nov 15, 2026' },
];

export function Dashboard() {
    const [range, setRange] = useState<TimeRange>('7D');
    const [metric, setMetric] = useState<MetricType>('revenue');
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const navigate = useNavigate();

    const currentData = ANALYTICS_DATA[range];
    const maxVal = Math.max(...currentData.series.map((item) => item[metric]));

    const kpiCards = [
        { label: 'Total Revenue', icon: DollarSign, ...currentData.kpis.revenue },
        { label: 'Active Users', icon: Users, ...currentData.kpis.users },
        { label: 'Total Orders', icon: ShoppingBag, ...currentData.kpis.orders },
        { label: 'Conversion Rate', icon: Activity, ...currentData.kpis.conversion },
    ];

    return (
        <div className={styles.dashboard}>

            <button className={styles.close} onClick={() => navigate('/')}>
                <X
                    className={styles.closeIcon}
                />
            </button>

            {/* Top Header & Time Filter */}
            <header className={styles.header}>
                <div className={styles.titleGroup}>
                    <h1>Analytics Overview</h1>
                    <p>Monitor key metrics, user growth, and traffic channels.</p>
                </div>

                <div className={styles.filterGroup} role="group" aria-label="Time range">
                    {(['7D', '30D', '12M'] as TimeRange[]).map((item) => (
                        <button
                            key={item}
                            type="button"
                            className={`${styles.filterButton} ${range === item ? styles.activeFilter : ''}`}
                            onClick={() => {
                                setRange(item);
                                setSelectedIndex(null);
                            }}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </header>

            {/* KPI Metric Cards */}
            <section className={styles.kpiGrid}>
                {kpiCards.map((kpi) => {
                    const Icon = kpi.icon;
                    return (
                        <div key={kpi.label} className={styles.kpiCard}>
                            <div className={styles.kpiHeader}>
                                <span>{kpi.label}</span>
                                <span className={styles.iconBox}>
                                    <Icon size={18} />
                                </span>
                            </div>
                            <p className={styles.kpiValue}>{kpi.value}</p>
                            <div className={`${styles.kpiTrend} ${kpi.up ? styles.trendUp : styles.trendDown}`}>
                                {kpi.up ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                                <span>{kpi.change}</span>
                                <span className={styles.trendLabel}>vs previous period</span>
                            </div>
                        </div>
                    );
                })}
            </section>

            {/* Main Charts Row */}
            <section className={styles.chartsGrid}>
                {/* Interactive Bar Chart */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>
                            {metric === 'revenue' ? 'Revenue Performance' : 'User Growth'}
                        </h2>
                        <div className={styles.metricToggle}>
                            <button
                                type="button"
                                className={`${styles.toggleChip} ${metric === 'revenue' ? styles.activeChip : ''}`}
                                onClick={() => setMetric('revenue')}
                            >
                                Revenue ($)
                            </button>
                            <button
                                type="button"
                                className={`${styles.toggleChip} ${metric === 'users' ? styles.activeChip : ''}`}
                                onClick={() => setMetric('users')}
                            >
                                Users
                            </button>
                        </div>
                    </div>

                    <div className={styles.barChartContainer}>
                        {currentData.series.map((point, idx) => {
                            const rawValue = point[metric];
                            const heightPercent = Math.max(8, Math.round((rawValue / maxVal) * 100));
                            const formattedValue =
                                metric === 'revenue'
                                    ? `$${rawValue.toLocaleString()}`
                                    : rawValue.toLocaleString();

                            return (
                                <div
                                    key={point.label}
                                    className={`${styles.barColumn} ${selectedIndex === idx ? styles.activeBar : ''}`}
                                    onClick={() => setSelectedIndex(selectedIndex === idx ? null : idx)}
                                >
                                    <span className={styles.tooltip}>{formattedValue}</span>
                                    <div
                                        className={`${styles.barFill} ${metric === 'users' ? styles.barFillPurple : ''}`}
                                        style={{ height: `${heightPercent}%` }}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    <div className={styles.barLabels}>
                        {currentData.series.map((point) => (
                            <span key={point.label} className={styles.barLabel}>
                                {point.label}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Traffic Sources Breakdown */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Traffic Channels</h2>
                    </div>

                    <div className={styles.sourceList}>
                        {currentData.sources.map((src) => (
                            <div key={src.name} className={styles.sourceItem}>
                                <div className={styles.sourceMeta}>
                                    <span className={styles.sourceName}>{src.name}</span>
                                    <span className={styles.sourceValue}>{src.percentage}%</span>
                                </div>
                                <div className={styles.progressTrack}>
                                    <div
                                        className={styles.progressFill}
                                        style={{
                                            width: `${src.percentage}%`,
                                            backgroundColor: src.color,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recent Transactions Table */}
            <section className={styles.card}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>Recent Activity</h2>
                </div>

                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Plan</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {RECENT_TRANSACTIONS.map((trx) => (
                                <tr key={trx.id}>
                                    <td>{trx.id}</td>
                                    <td>{trx.customer}</td>
                                    <td>{trx.plan}</td>
                                    <td>{trx.amount}</td>
                                    <td>
                                        <span
                                            className={`${styles.statusBadge} ${
                                                trx.status === 'Completed'
                                                ? styles.statusCompleted
                                                : styles.statusPending
                                            }`}
                                        >
                                            {trx.status}
                                        </span>
                                    </td>
                                    <td>{trx.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
          

      {/* Recent Transactions Table */}

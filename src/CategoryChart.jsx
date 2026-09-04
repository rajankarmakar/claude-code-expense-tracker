import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const LINE = '#2a3a57';
const DIM = '#92a0b8';
const BRASS = '#c89b3c';
const PANEL = '#182338';

function CategoryChart({ transactions, categories }) {
  const data = categories
    .map(category => ({
      category,
      total: transactions
        .filter(t => t.type === 'expense' && t.category === category)
        .reduce((sum, t) => sum + t.amount, 0),
    }))
    .filter(entry => entry.total > 0);

  if (data.length === 0) {
    return (
      <div className="category-chart">
        <h2>Spending by Category</h2>
        <p className="no-data">No expenses yet</p>
      </div>
    );
  }

  return (
    <div className="category-chart">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={LINE} />
          <XAxis dataKey="category" stroke={DIM} tick={{ fill: DIM, fontSize: 12, fontFamily: 'JetBrains Mono, monospace' }} tickLine={false} axisLine={{ stroke: LINE }} />
          <YAxis stroke={DIM} tick={{ fill: DIM, fontSize: 12, fontFamily: 'JetBrains Mono, monospace' }} tickLine={false} axisLine={{ stroke: LINE }} />
          <Tooltip
            formatter={(value) => `$${value}`}
            contentStyle={{ background: PANEL, border: `1px solid ${LINE}`, fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}
            labelStyle={{ color: DIM }}
            itemStyle={{ color: '#e7e9ee' }}
            cursor={{ fill: LINE, opacity: 0.4 }}
          />
          <Bar dataKey="total" fill={BRASS} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoryChart

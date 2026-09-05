import React, { useState, useMemo } from 'react';

export interface PricePoint {
  date: string;
  price: number;
}

interface PriceHistoryChartProps {
  data: PricePoint[];
}

type TimeRange = 3 | 6 | 12;

export const PriceHistoryChart: React.FC<PriceHistoryChartProps> = ({ data }) => {
  const [range, setRange] = useState<TimeRange>(6);

  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Sort data by date just in case
    const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Find the latest date to calculate the offset
    const latestDateStr = sortedData[sortedData.length - 1].date;
    const latestDate = new Date(latestDateStr);

    // Calculate cutoff date based on selected range
    const cutoffDate = new Date(latestDate);
    cutoffDate.setMonth(cutoffDate.getMonth() - range);

    // Always include at least one point before the cutoff if possible to render the line correctly starting from the left
    const result = sortedData.filter(d => new Date(d.date) >= cutoffDate);

    // If we have data but none in the range, at least show the last known point
    if (result.length === 0 && sortedData.length > 0) {
      return [sortedData[sortedData.length - 1]];
    }

    return result;
  }, [data, range]);

  const { minPrice, maxPrice } = useMemo(() => {
    if (filteredData.length === 0) return { minPrice: 0, maxPrice: 100 };

    const prices = filteredData.map(d => d.price);
    // Add some padding to min and max so the line doesn't touch the edges
    const min = Math.min(...prices);
    const max = Math.max(...prices);

    const padding = (max - min) * 0.1 || max * 0.1 || 10;

    return {
      minPrice: Math.max(0, min - padding),
      maxPrice: max + padding
    };
  }, [filteredData]);

  // Chart Dimensions
  const width = 260;
  const height = 120;
  const padding = { top: 10, right: 10, bottom: 20, left: 35 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const points = useMemo(() => {
    if (filteredData.length < 2) return '';

    const startTime = new Date(filteredData[0].date).getTime();
    const endTime = new Date(filteredData[filteredData.length - 1].date).getTime();
    const timeRange = endTime - startTime || 1; // Avoid division by zero

    const priceRange = maxPrice - minPrice || 1; // Avoid division by zero

    return filteredData.map(d => {
      const time = new Date(d.date).getTime();
      const x = ((time - startTime) / timeRange) * chartWidth + padding.left;
      const y = height - padding.bottom - ((d.price - minPrice) / priceRange) * chartHeight;
      return `${x},${y}`;
    }).join(' ');
  }, [filteredData, minPrice, maxPrice, chartWidth, chartHeight, padding.left, padding.bottom, height]);

  const styles = {
    container: {
      marginTop: '16px',
      padding: '12px',
      backgroundColor: '#fff',
      borderRadius: '6px',
      border: '1px solid #e0e0e0'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px'
    },
    title: {
      fontSize: '13px',
      fontWeight: '600',
      color: '#444'
    },
    controls: {
      display: 'flex',
      gap: '4px'
    },
    button: (isActive: boolean) => ({
      padding: '2px 6px',
      fontSize: '11px',
      borderRadius: '4px',
      border: isActive ? '1px solid #1976d2' : '1px solid #ccc',
      backgroundColor: isActive ? '#e3f2fd' : '#f5f5f5',
      color: isActive ? '#1976d2' : '#666',
      cursor: 'pointer',
      fontWeight: isActive ? 'bold' : 'normal'
    }),
    chart: {
      width: '100%',
      height: `${height}px`,
      display: 'block'
    },
    axisText: {
      fontSize: '10px',
      fill: '#888'
    },
    line: {
      fill: 'none',
      stroke: '#2196f3',
      strokeWidth: 2,
      strokeLinejoin: 'round' as const
    },
    noData: {
      textAlign: 'center' as const,
      color: '#888',
      fontSize: '12px',
      padding: '20px 0'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.title}>Price History</div>
        <div style={styles.controls}>
          <button style={styles.button(range === 3)} onClick={() => setRange(3)}>3M</button>
          <button style={styles.button(range === 6)} onClick={() => setRange(6)}>6M</button>
          <button style={styles.button(range === 12)} onClick={() => setRange(12)}>1Y</button>
        </div>
      </div>

      {filteredData.length >= 2 ? (
        <svg viewBox={`0 0 ${width} ${height}`} style={styles.chart}>
          {/* Y-axis grid lines and labels */}
          <line x1={padding.left} y1={padding.top} x2={width - padding.right} y2={padding.top} stroke="#eee" />
          <text x={padding.left - 5} y={padding.top + 4} textAnchor="end" style={styles.axisText}>${maxPrice.toFixed(0)}</text>

          <line x1={padding.left} y1={padding.top + chartHeight / 2} x2={width - padding.right} y2={padding.top + chartHeight / 2} stroke="#eee" />
          <text x={padding.left - 5} y={padding.top + chartHeight / 2 + 4} textAnchor="end" style={styles.axisText}>${(minPrice + (maxPrice - minPrice) / 2).toFixed(0)}</text>

          <line x1={padding.left} y1={height - padding.bottom} x2={width - padding.right} y2={height - padding.bottom} stroke="#eee" />
          <text x={padding.left - 5} y={height - padding.bottom + 4} textAnchor="end" style={styles.axisText}>${minPrice.toFixed(0)}</text>

          {/* The line chart */}
          <polyline points={points} style={styles.line} />

          {/* Start and end points */}
          {points && (
            <>
              <circle
                cx={points.split(' ')[0].split(',')[0]}
                cy={points.split(' ')[0].split(',')[1]}
                r={3}
                fill="#2196f3"
              />
              <circle
                cx={points.split(' ')[points.split(' ').length - 1].split(',')[0]}
                cy={points.split(' ')[points.split(' ').length - 1].split(',')[1]}
                r={3}
                fill="#2196f3"
              />
            </>
          )}
        </svg>
      ) : (
        <div style={styles.noData}>Not enough data to display chart</div>
      )}
    </div>
  );
};

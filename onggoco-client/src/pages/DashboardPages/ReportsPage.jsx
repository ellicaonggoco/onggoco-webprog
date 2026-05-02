import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
  Container,
  Button,
} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { Print as PrintIcon } from "@mui/icons-material";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const revenueData = [
  4200, 5800, 4900, 7200, 6100, 8500, 7800, 9200, 8400, 10100, 9300, 11500,
];
const expensesData = [
  3100, 4200, 3800, 5100, 4700, 6200, 5900, 7100, 6600, 7800, 7200, 8900,
];
const visitorData = [
  1200, 1800, 1500, 2200, 1900, 2700, 2400, 3100, 2800, 3500, 3200, 4000,
];

const pieData = [
  { id: 0, value: 40, label: "Organic Search", color: "#f97316" },
  { id: 1, value: 25, label: "Direct", color: "#22d3ee" },
  { id: 2, value: 20, label: "Social Media", color: "#a78bfa" },
  { id: 3, value: 15, label: "Referral", color: "#34d399" },
];

const summaryStats = [
  { label: "AVG. MONTHLY REVENUE", value: "$7,608", color: "#f97316" },
  { label: "TOTAL ANNUAL REVENUE", value: "$91,300", color: "#22d3ee" },
  { label: "PEAK MONTH", value: "December", color: "#a78bfa" },
  { label: "YOY GROWTH", value: "+22.4%", color: "#34d399" },
];

const cardSx = {
  borderRadius: "20px",
  bgcolor: "#161616",
  border: "1px solid rgba(255,255,255,0.06)",
  height: "100%",
};

const axisStyle = {
  "& .MuiChartsAxis-tickLabel": {
    fill: "#475569 !important",
    fontSize: "11px !important",
  },
  "& .MuiChartsAxis-line": { stroke: "rgba(255,255,255,0.06) !important" },
  "& .MuiChartsAxis-tick": { stroke: "rgba(255,255,255,0.06) !important" },
  "& .MuiChartsGrid-line": { stroke: "rgba(255,255,255,0.04) !important" },
};

export default function ReportsPage() {
  const [period, setPeriod] = useState("monthly");

  const handlePrint = () => {
    // Create printable HTML
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Reports Dashboard</title>
          <meta charset="utf-8" />
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              background: white;
              color: #333;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #f97316;
              padding-bottom: 20px;
            }
            .title {
              font-size: 28px;
              font-weight: bold;
              color: #f97316;
            }
            .subtitle {
              font-size: 14px;
              color: #666;
              margin-top: 5px;
            }
            .date {
              font-size: 12px;
              color: #999;
              margin-top: 10px;
            }
            .stats {
              display: flex;
              flex-wrap: wrap;
              gap: 20px;
              margin-bottom: 30px;
            }
            .stat-card {
              flex: 1;
              border: 1px solid #ddd;
              border-radius: 10px;
              padding: 15px;
              text-align: center;
              background: #f9f9f9;
            }
            .stat-label {
              font-size: 11px;
              text-transform: uppercase;
              color: #666;
            }
            .stat-value {
              font-size: 24px;
              font-weight: bold;
              margin-top: 8px;
            }
            h3 {
              margin-top: 25px;
              margin-bottom: 15px;
              color: #333;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 15px 0;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 10px;
              text-align: left;
            }
            th {
              background: #f5f5f5;
            }
            .footer {
              text-align: center;
              font-size: 10px;
              color: #999;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #eee;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">Report Summary</div>
            <div class="subtitle">Analytics overview for generated reports, category breakdown, and completion performance.</div>
            <div class="date">Prepared on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</div>
          </div>
          
          <div class="stats">
            <div class="stat-card"><div class="stat-label">AVG. MONTHLY REVENUE</div><div class="stat-value" style="color: #f97316">$7,608</div></div>
            <div class="stat-card"><div class="stat-label">TOTAL ANNUAL REVENUE</div><div class="stat-value" style="color: #22d3ee">$91,300</div></div>
            <div class="stat-card"><div class="stat-label">PEAK MONTH</div><div class="stat-value" style="color: #a78bfa">December</div></div>
            <div class="stat-card"><div class="stat-label">YOY GROWTH</div><div class="stat-value" style="color: #34d399">+22.4%</div></div>
          </div>

          <h3>Monthly Report Output</h3>
          <table>
            <thead><tr><th>Month</th><th>Revenue ($)</th><th>Expenses ($)</th></tr></thead>
            <tbody>
              ${months
                .slice(0, 6)
                .map(
                  (m, i) =>
                    `<tr><td>${m}</td><td>$${revenueData[i]}</td><td>$${expensesData[i]}</td></tr>`,
                )
                .join("")}
            </tbody>
          </table>

          <h3>Report Category Share</h3>
          <table>
            <thead><tr><th>Category</th><th>Percentage</th></tr></thead>
            <tbody>
              ${pieData.map((p) => `<tr><td>${p.label}</td><td>${p.value}%</td></tr>`).join("")}
            </tbody>
          </table>

          <h3>Monthly Visitors Trend</h3>
          <table>
            <thead><tr><th>Month</th><th>Visitors</th></tr></thead>
            <tbody>
              ${months.map((m, i) => `<tr><td>${m}</td><td>${visitorData[i].toLocaleString()}</td></tr>`).join("")}
            </tbody>
          </table>

          <div class="footer">
            Generated from Reports Dashboard | Data represents current fiscal year
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Container
      maxWidth={false}
      sx={{ py: 5, px: { xs: 3, md: 5 }, width: "100%" }}
    >
      {/* Print Button */}
      <Box display="flex" justifyContent="flex-end" mb={3}>
        <Button
          variant="contained"
          startIcon={<PrintIcon />}
          onClick={handlePrint}
          sx={{
            bgcolor: "#f97316",
            color: "#000",
            fontFamily: "'Syne', sans-serif",
            fontWeight: 600,
            textTransform: "none",
            borderRadius: "10px",
            px: 3,
            py: 1,
            "&:hover": { bgcolor: "#ea7008" },
          }}
        >
          Print / Save as PDF
        </Button>
      </Box>

      {/* Screen View */}
      <Box textAlign="center" mb={6}>
        <Typography
          sx={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: { xs: "2rem", md: "3rem" },
            color: "#f1f5f9",
            mb: 1,
          }}
        >
          Reports
        </Typography>
        <Typography
          sx={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1rem",
            color: "#475569",
          }}
        >
          Data visualization and analytics overview
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center" mb={8}>
        <ToggleButtonGroup
          value={period}
          exclusive
          onChange={(_, v) => v && setPeriod(v)}
          size="small"
          sx={{
            bgcolor: "#161616",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "12px",
            p: "6px",
          }}
        >
          <ToggleButton value="weekly">Weekly</ToggleButton>
          <ToggleButton value="monthly">Monthly</ToggleButton>
          <ToggleButton value="yearly">Yearly</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          mb: 8,
          justifyContent: "center",
        }}
      >
        {summaryStats.map((s) => (
          <Box key={s.label} sx={{ flex: "1 1 220px", minWidth: 200 }}>
            <Card elevation={0} sx={cardSx}>
              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <Typography
                  sx={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.75rem",
                    color: "#475569",
                    textTransform: "uppercase",
                    mb: 2,
                  }}
                >
                  {s.label}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "1.8rem",
                    color: s.color,
                  }}
                >
                  {s.value}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, mb: 8 }}>
        <Box sx={{ flex: "2 1 55%", minWidth: 320 }}>
          <Card elevation={0} sx={cardSx}>
            <CardContent sx={{ p: 3.5 }}>
              <Typography
                sx={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  color: "#f1f5f9",
                  mb: 2,
                }}
              >
                Revenue vs Expenses
              </Typography>
              <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 3 }} />
              <BarChart
                xAxis={[{ scaleType: "band", data: months }]}
                series={[
                  { data: revenueData, color: "#f97316" },
                  { data: expensesData, color: "#22d3ee" },
                ]}
                height={360}
                slotProps={{ legend: { hidden: true } }}
                sx={axisStyle}
              />
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: "1 1 35%", minWidth: 300 }}>
          <Card elevation={0} sx={cardSx}>
            <CardContent sx={{ p: 3.5 }}>
              <Typography
                sx={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  color: "#f1f5f9",
                  mb: 2,
                }}
              >
                Traffic Sources
              </Typography>
              <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 3 }} />
              <Box display="flex" justifyContent="center">
                <PieChart
                  series={[
                    {
                      data: pieData,
                      innerRadius: 55,
                      outerRadius: 95,
                      cx: 125,
                      cy: 115,
                    },
                  ]}
                  width={270}
                  height={240}
                  slotProps={{ legend: { hidden: true } }}
                />
              </Box>
              <Box mt={3}>
                {pieData.map((item) => (
                  <Box
                    key={item.id}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    py={1}
                  >
                    <Box display="flex" alignItems="center" gap={1.5}>
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          bgcolor: item.color,
                        }}
                      />
                      <Typography sx={{ fontSize: "0.8rem", color: "#64748b" }}>
                        {item.label}
                      </Typography>
                    </Box>
                    <Typography sx={{ fontWeight: 700, color: item.color }}>
                      {item.value}%
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Card elevation={0} sx={cardSx}>
        <CardContent sx={{ p: 3.5 }}>
          <Typography
            sx={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "1.2rem",
              color: "#f1f5f9",
              mb: 2,
            }}
          >
            Monthly Visitors
          </Typography>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 3 }} />
          <LineChart
            xAxis={[{ scaleType: "band", data: months }]}
            series={[
              {
                data: visitorData,
                color: "#f97316",
                area: true,
                showMark: false,
              },
            ]}
            height={280}
            slotProps={{ legend: { hidden: true } }}
            sx={{
              ...axisStyle,
              "& .MuiAreaElement-root": { fill: "#f97316", opacity: 0.08 },
            }}
          />
        </CardContent>
      </Card>
    </Container>
  );
}

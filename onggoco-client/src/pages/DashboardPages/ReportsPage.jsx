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
} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";

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

  return (
    <Container
      maxWidth={false}
      sx={{ py: 5, px: { xs: 3, md: 5 }, width: "100%" }}
    >
      {/* Header */}
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
            fontSize: "1.5rem",
            color: "#f97316",
            mb: 2,
          }}
        >
          Data visualization and analytics overview
        </Typography>
      </Box>

      {/* Period Toggle - Centered */}
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
            "& .MuiToggleButtonGroup-grouped": {
              border: 0,
              borderRadius: "8px !important",
              mx: 1,
            },
            "& .MuiToggleButton-root": {
              textTransform: "none",
              px: 4,
              py: 1.2,
              fontSize: "0.9rem",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 600,
              color: "#64748b",
              "&.Mui-selected": {
                bgcolor: "#f97316",
                color: "#000",
                "&:hover": { bgcolor: "#ea7008" },
              },
            },
          }}
        >
          <ToggleButton value="weekly">Weekly</ToggleButton>
          <ToggleButton value="monthly">Monthly</ToggleButton>
          <ToggleButton value="yearly">Yearly</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ height: 30 }} />

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
          <Box
            key={s.label}
            sx={{
              flex: "1 1 220px",
              minWidth: 200,
            }}
          >
            <Card elevation={0} sx={cardSx}>
              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <Typography
                  sx={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.75rem",
                    color: "#475569",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    mb: 2,
                    fontWeight: 500,
                  }}
                >
                  {s.label}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: { xs: "1.4rem", md: "1.8rem" },
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

      {/* Charts row - Horizontal */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          mb: 8,
        }}
      >
        {/* Bar Chart */}
        <Box sx={{ flex: "2 1 55%", minWidth: 320 }}>
          <Card elevation={0} sx={cardSx}>
            <CardContent sx={{ p: 3.5 }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2.5}
                flexWrap="wrap"
                gap={1}
              >
                <Typography
                  sx={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.2rem",
                    color: "#f1f5f9",
                  }}
                >
                  Revenue vs Expenses
                </Typography>
                <Box display="flex" gap={2.5}>
                  {[
                    { label: "Revenue", color: "#f97316" },
                    { label: "Expenses", color: "#22d3ee" },
                  ].map((l) => (
                    <Box
                      key={l.label}
                      display="flex"
                      alignItems="center"
                      gap={1}
                    >
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          bgcolor: l.color,
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "0.75rem",
                          color: "#475569",
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        {l.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
              <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 3 }} />
              <BarChart
                xAxis={[{ scaleType: "band", data: months }]}
                series={[
                  { data: revenueData, label: "Revenue", color: "#f97316" },
                  { data: expensesData, label: "Expenses", color: "#22d3ee" },
                ]}
                height={360}
                margin={{ top: 10, bottom: 30, left: 60, right: 10 }}
                slotProps={{ legend: { hidden: true } }}
                sx={axisStyle}
              />
            </CardContent>
          </Card>
        </Box>

        {/* Pie Chart */}
        <Box sx={{ flex: "1 1 35%", minWidth: 300 }}>
          <Card elevation={0} sx={cardSx}>
            <CardContent sx={{ p: 3.5 }}>
              <Typography
                sx={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  color: "#f1f5f9",
                  mb: 2.5,
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
                      paddingAngle: 3,
                      cornerRadius: 5,
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
                          flexShrink: 0,
                        }}
                      />
                      <Typography
                        sx={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.8rem",
                          color: "#64748b",
                        }}
                      >
                        {item.label}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        color: item.color,
                      }}
                    >
                      {item.value}%
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Line Chart - Full width */}
      <Card elevation={0} sx={cardSx}>
        <CardContent sx={{ p: 3.5 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2.5}
          >
            <Typography
              sx={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "1.2rem",
                color: "#f1f5f9",
              }}
            >
              Monthly Visitors
            </Typography>
            <Chip
              label="2024"
              size="small"
              sx={{
                bgcolor: "rgba(249,115,22,0.1)",
                color: "#f97316",
                fontFamily: "'Syne', sans-serif",
                fontWeight: 600,
                fontSize: "0.7rem",
                border: "1px solid rgba(249,115,22,0.2)",
                height: 26,
              }}
            />
          </Box>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 3 }} />
          <LineChart
            xAxis={[{ scaleType: "band", data: months }]}
            series={[
              {
                data: visitorData,
                label: "Visitors",
                color: "#f97316",
                area: true,
                showMark: false,
              },
            ]}
            height={280}
            margin={{ top: 10, bottom: 30, left: 60, right: 20 }}
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

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

type PropType = {
	onChange: (value: Array<number>) => void;
	className?: string;
};

export default function RatingFilterStars({ onChange }: PropType) {
	const defaultRange: number | Array<number> = [1, 10];
	const [value, setValue] = useState<Array<number>>(defaultRange);

	const handleChange = (
		_event: Event,
		newValue: number | Array<number>,
		activeThumb: number
	) => {
		if (!Array.isArray(newValue)) {
			return;
		}

		if (activeThumb === 0) {
			setValue([Math.min(newValue[0], value[1]), value[1]]);
		} else {
			setValue([value[0], Math.max(newValue[1], value[0])]);
		}
		onChange(newValue);
	};

	const handleReset = () => {
		onChange(defaultRange);
		setValue(defaultRange);
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: { xs: "column", md: "row" },
				alignItems: "center",
				width: "auto",
				paddingTop: 2,
			}}
		>
			<Box sx={{ marginRight: { xs: 0, md: 2 } }}>
				<Typography fontSize={14}>RATING</Typography>
				<Slider
					size="small"
					value={value}
					onChange={handleChange}
					valueLabelDisplay="auto"
					min={1}
					max={10}
					marks
					step={1}
					disableSwap
					sx={{ width: "300px" }}
				/>
			</Box>

			<Box sx={{ marginTop: { xs: 2, md: 0 } }}>
				<IconButton size="small" onClick={handleReset}>
					<RestartAltIcon />
				</IconButton>
			</Box>
		</Box>
	);
}

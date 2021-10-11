import React, { useCallback, useState } from "react";
import { IconButton, InputBase } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import {
  Search as SearchIcon,
  HighlightOff as ClearIcon,
} from "@mui/icons-material";
import { useIntl } from "react-intl";

const Search = styled("div")(({ theme }) => ({
  "borderRadius": theme.shape.borderRadius,
  "backgroundColor": alpha(theme.palette.text.primary, 0.1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.text.primary, 0.15),
  },
  "margin": theme.spacing(1),
}));

const InputIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "color": "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 0),
  },
}));

interface Props {
  onSearch: (value: string) => void;
}

export const MarketSelectionSearch: React.FunctionComponent<Props> = ({
  onSearch,
}) => {
  const i18n = useIntl();
  const [value, setValue] = useState("");

  const updateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onSearch(event.target.value);
  };

  const clearValue = useCallback(() => {
    setValue("");
    onSearch("");
  }, [onSearch]);

  const placeholder = i18n.formatMessage({
    id: "MarketSelectionSearch.placeholder",
    defaultMessage: "Search...",
    description:
      "Placeholder of the search input in the market selection dialog",
  });

  return (
    <Search>
      <StyledInputBase
        startAdornment={
          <InputIconWrapper>
            <SearchIcon />
          </InputIconWrapper>
        }
        placeholder={placeholder}
        value={value}
        onChange={updateValue}
        inputProps={{ "aria-label": "search" }}
        fullWidth
        endAdornment={
          value?.length > 0 ? (
            <IconButton onClick={clearValue} color="default">
              <ClearIcon />
            </IconButton>
          ) : undefined
        }
      />
    </Search>
  );
};

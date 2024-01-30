import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Box, InputAdornment, useTheme } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/styles";
import { MyTextField } from "control";
import { debounce } from "lodash";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "store";
import { openSnackbar } from "store/slices/snackbar";
import axios from "utils/axios";
interface IProduct {
	id: number;
	title: string;
	price: number;
	thumbnail: string;
}
const MyTheadCell = styled(Box)(({ theme }) => ({
	borderLeft: "1px solid #f1f1f1",
	borderBottom: "1px solid #f1f1f1",
	paddingTop: "20px",
	paddingBottom: "20px",
	paddingLeft: "20px",
	paddingRight: "20px",
	fontWeight: "bold",
	background: "#03a9f4",
	fontFamily: "Roboto"
}));
const MyTbodyCell = styled(Box)(({ theme }) => ({
	borderLeft: "1px solid #f1f1f1",
	borderBottom: "1px solid #f1f1f1",
	paddingTop: "20px",
	paddingBottom: "20px",
	paddingLeft: "20px",
	paddingRight: "20px",
	fontFamily: "Roboto",
	display: "flex",
	alignItems: "center"
}));
const ProductList = () => {
	const navigate = useNavigate();
	const theme = useTheme();
	const dispatch = useDispatch();
	let mounted: boolean = true;
	const [search, setSearch] = React.useState<string>("");
	const [rows, setRows] = React.useState<IProduct[]>([]);
	const [isLoading, setLoading] = React.useState<boolean>(true);
	const [selected, setSelected] = React.useState<number[]>([]);
	const isSelected = (id: number) => selected.indexOf(id) !== -1;
	const screenView = React.useRef<HTMLDivElement | null>(null);
	const [limit, setLimit] = React.useState<number>(20);
	const [totalItem, setTotalItem] = React.useState<number>(0);
	const [isShowProgress, setIsShowProgress] = React.useState<boolean>(false);
	const tbProductHeight: number = 900;
	const rowHeight: number = 81;
	const getList = async (limit: number, keyword: string) => {
		try {
			let url = "";
			if (keyword) {
				url = `/products/search`;
			} else {
				url = `/products`;
			}
			const res = await axios.get(url, {
				params: {
					q: keyword ? keyword : undefined,
					limit,
					skip: 0
				}
			});
			if (mounted) {
				const { products, total } = res.data;
				setLoading(false);
				let items: IProduct[] = products && products.length > 0 ? products : [];
				setRows(items);
				setTotalItem(total);
			}
		} catch (err: any) {
			const txtMsg = err && err.data && err.data.exception ? err.data.exception : "";
			dispatch(
				openSnackbar({
					open: true,
					message: txtMsg,
					anchorOrigin: { vertical: "bottom", horizontal: "left" },
					variant: "alert",
					alert: {
						color: "error"
					},
					transition: "Fade",
					close: false
				})
			);
		}
	};
	React.useEffect(() => {
		getList(limit, "");
		if (limit > 20) {
			setTimeout(() => {
				setIsShowProgress(false);
				if (screenView.current) {
					screenView.current.scrollTo({
						top: 200,
						left: 0,
						behavior: "smooth"
					});
				}
			}, 1000);
		}
		return () => {
			mounted = false;
		};
	}, [limit]);
	React.useEffect(() => {
		let scrollTop: number = 0;
		if (screenView.current) {
			const screenHeight = screenView.current.clientHeight;
			const windowHeight = rowHeight * limit;
			screenView.current.scrollTo({
				top: 0,
				left: 0,
				behavior: "smooth"
			});
			screenView.current.onscroll = () => {
				scrollTop = screenView.current ? parseInt(screenView.current.scrollTop.toString()) : 0;
				if (scrollTop + screenHeight === windowHeight && limit < totalItem) {
					setLimit((prevLimit) => prevLimit + 20);
					setIsShowProgress(true);
				}
			};
		}
		return () => {
			mounted = false;
		};
	}, [totalItem, limit]);
	const handleSearch = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
		let strSearch = event && event.target && event.target.value ? event.target.value.toString() : "";
		setSearch(strSearch);
		setLimit(20);
		setLoading(true);
		debouncedSearch(20, strSearch);
		if (screenView.current) {
			screenView.current.scrollTo({
				top: 0,
				left: 0,
				behavior: "smooth"
			});
		}
	};
	const debouncedSearch = React.useRef(
		debounce((limit: number, strSearch: string) => {
			mounted = true;
			getList(limit, strSearch);
		}, 500)
	).current;
	React.useEffect(() => {
		return () => {
			debouncedSearch.cancel();
		};
	}, [debouncedSearch]);
	return (
		<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
			<Box sx={{ width: "1280px" }}>
				<Box
					display="flex"
					alignItems="center"
					color={theme.palette.grey[800]}
					fontWeight={500}
					fontSize={20}
					height={60}
					borderBottom={1}
					pl={2}
					pr={2}
					borderColor={theme.palette.grey[300]}
				>
					Product list
				</Box>
				<Box p={2} display="flex" justifyContent="space-between" alignItems="center" height={60}>
					<Box>
						<MyTextField
							fullWidth
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<SearchIcon fontSize="small" />
									</InputAdornment>
								)
							}}
							placeholder={"Product name"}
							onChange={handleSearch}
							value={search}
							size="small"
						/>
					</Box>
				</Box>
				<Box sx={{ position: "relative" }}>
					<Box sx={{ borderRight: "1px solid #f1f1f1", borderTop: "1px solid #f1f1f1", display: "flex", width: "100%" }}>
						<MyTheadCell sx={{ width: "400px" }}>Name</MyTheadCell>
						<MyTheadCell sx={{ width: "400px" }}>Price</MyTheadCell>
						<MyTheadCell sx={{ flexGrow: 1 }}>Image</MyTheadCell>
					</Box>
					<Box
						sx={{
							height: `${tbProductHeight}px`,
							overflowX: "hidden",
							borderBottom: "1px solid #f1f1f1",
							"::-webkit-scrollbar": {
								width: "8px",
								height: "8px",
								transition: "all .5s ease"
							},
							"::-webkit-scrollbar:hover": {
								width: "8px",
								height: "8px"
							},
							"::-webkit-scrollbar-track": {
								backgroundColor: "transparent",
								borderRadius: "8px"
							},
							"::-webkit-scrollbar-thumb": {
								background: "#03a9f4",
								transition: "all .5s ease",
								borderRadius: "8px",
								opacity: ".5"
							},
							"::-webkit-scrollbar-thumb:hover": {
								background: "#03a9f4",
								opacity: ".9"
							}
						}}
						ref={screenView}
					>
						{rows && rows.length > 0 ? (
							<React.Fragment>
								{rows.map((elmt: IProduct, idx: number) => {
									return (
										<Box key={`product-idx-${idx}`} sx={{ display: "flex", width: "100%" }}>
											<MyTbodyCell sx={{ borderLeft: "1px solid #f1f1f1", width: "400px" }}>{elmt.title}</MyTbodyCell>
											<MyTbodyCell sx={{ borderLeft: "1px solid #f1f1f1", width: "400px" }}>
												{new Intl.NumberFormat("en-US", {
													style: "currency",
													currency: "USD",
													maximumFractionDigits: 0
												}).format(elmt.price)}
											</MyTbodyCell>
											<MyTbodyCell
												sx={{
													borderLeft: "1px solid #f1f1f1",
													flexGrow: 1,
													display: "flex",
													justifyContent: "center",
													alignItems: "center"
												}}
											>
												<Avatar src={elmt.thumbnail} />
											</MyTbodyCell>
										</Box>
									);
								})}
							</React.Fragment>
						) : (
							<React.Fragment></React.Fragment>
						)}
					</Box>
					{isShowProgress && (
						<Box
							sx={{
								position: "absolute",
								bottom: 0,
								left: 0,
								width: "100%",
								height: 40,
								display: "flex",
								justifyContent: "center"
							}}
						>
							<CircularProgress />
						</Box>
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default ProductList;

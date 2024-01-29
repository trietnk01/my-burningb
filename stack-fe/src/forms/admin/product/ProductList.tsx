import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import SearchIcon from "@mui/icons-material/Search";
import {
	Avatar,
	Box,
	Button,
	Card,
	Checkbox,
	IconButton,
	InputAdornment,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	useTheme
} from "@mui/material";
import { MyTextField } from "control";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "store";
import axios from "utils/axios";
import { openSnackbar } from "store/slices/snackbar";
import { DataTableLoading } from "components";
import NoAvatar from "assets/images/no-avatar.jpg";
import Swal from "sweetalert2";
import { END_POINT } from "configs";
import { debounce } from "lodash";
import { useQuery } from "@apollo/client";
import CircularProgress from "@mui/material/CircularProgress";
interface IProduct {
	id: number;
	title: string;
	price: number;
	thumbnail: string;
}
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
	const rowHeight: number = 73;
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
			}, 3000);
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
				console.log("limit = ", limit);
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
	const dataTableLoaded = () => {
		return (
			<React.Fragment>
				{rows && rows.length > 0 ? (
					<React.Fragment>
						{rows.map((elmt: IProduct, idx: number) => {
							return (
								<TableRow hover key={`product-idx-${idx}`}>
									<TableCell width={800}>{elmt.title}</TableCell>
									<TableCell width={500}>{elmt.price}</TableCell>
									<TableCell>
										<Avatar src={elmt.thumbnail} />
									</TableCell>
								</TableRow>
							);
						})}
					</React.Fragment>
				) : (
					<React.Fragment></React.Fragment>
				)}
			</React.Fragment>
		);
	};
	return (
		<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
			<Box sx={{ width: "900px" }}>
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
					<Box>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell width={800}>{"Name"}</TableCell>
									<TableCell width={500}>{"Price"}</TableCell>
									<TableCell>{"Image"}</TableCell>
								</TableRow>
							</TableHead>
						</Table>
					</Box>
					<Box sx={{ height: `${tbProductHeight}px`, overflowX: "hidden" }} ref={screenView}>
						<TableContainer>
							<Table>
								<TableBody>
									<DataTableLoading isLoading={isLoading} data={dataTableLoaded()} numColumn={3} />
								</TableBody>
							</Table>
						</TableContainer>
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

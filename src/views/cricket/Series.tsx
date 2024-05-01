import { useEffect, useState } from "react";
import { ISeries, ISeriesResponse, ISeriesType } from "../../interfaces/seriesResponse";
import {
  FlatList,
  Pressable,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import moment from "moment";
import { Loader } from "../../component/Loader";
import {useNavigation} from '@react-navigation/native'

interface IFilter {
  type: "Test" | "T20I" | "ODI";
  isSelected: boolean;
}

export const Series = () => {
  const [series, setSeries] = useState<ISeriesType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<IFilter[]>([
    {
      type: "Test",
      isSelected: true,
    },
    {
      type: "T20I",
      isSelected: false,
    },
    {
      type: "ODI",
      isSelected: false,
    },
  ]);

  const navigation = useNavigation();

  const filteredSeries = series.filter((series) => {
    const selectedFilter = filters.find((filter) => filter.isSelected);
    return series.type === selectedFilter?.type;
  });

  useEffect(() => {
    fetch("https://cricket-live-data.p.rapidapi.com/series", {
      headers: {
        "X-RapidAPI-Key": "71535109e2mshaeba54bcae6f51dp1c2a6fjsn6fef532752cf",
        "X-RapidAPI-Host": "cricket-live-data.p.rapidapi.com",
      },
    })
      .then(async (response) => {
        const jsonResponse: ISeriesResponse = await response.json();
        setSeries(jsonResponse.results);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));

  }, []);

  const renderItem = ({ item }: { item: ISeries }) => {
    return (
      <Pressable style={[styles.seriesCard]} onPress={() => {
            //@ts-ignore
            navigation.navigate("FixturesBySeries" , {seriesId : item.series_id})
        }}>
        <Text style={[styles.cardHeading]}>{item.series_name}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            width: "100%",
            marginTop: 10,
          }}
        >
          <Text>{`Season: ${item.season}`}</Text>
          <Text>{`Last Updated: ${moment(item.updated_at).format(
            "DD-MMM-YYYY"
          )}`}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000000",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {filters.map((filter, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.typeButton,
              { backgroundColor: filter.isSelected ? "#FBC02D" : "#FFFDE7" },
            ]}
            onPress={() => {
              setFilters((prevFilters) => {
                return prevFilters.map((prevFilter, i) => {
                  if (i === index) {
                    return {
                      ...prevFilter,
                      isSelected: true,
                    };
                  }
                  return {
                    ...prevFilter,
                    isSelected: false,
                  };
                });
              });
            }}
          >
            <Text
              style={{
                textAlign: "center",
              }}
            >
              {filter.type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList data={filteredSeries[0]?.series} renderItem={renderItem} />
      {loading && <Loader isVisible={loading} message="Loading Series" />}
    </View>
  );
};

const styles = StyleSheet.create({
  seriesCard: {
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#FFF9C4",
    marginVertical: 5,
    padding: 10,
    alignItems: "center",
  },
  cardHeading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
  },
  typeButton: {
    backgroundColor: "#FFFDE7",
    borderWidth: 1,
    borderColor: "#000000",
    flex: 1,
    height: 30,
    justifyContent: "center",
    marginVertical: 10,
  },
});

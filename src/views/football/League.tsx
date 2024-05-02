import { useEffect, useState } from "react";
import {
  Pressable,
  View,
  TouchableOpacity,
  FlatList,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import { Loader } from "../../component/Loader";
import {
  ILeaguesBySeason,
  ILeaguesBySeasonResponse,
} from "../../interfaces/seasonResponse";
import {useNavigation} from '@react-navigation/native'

interface IFilter {
  season: "2022" | "2021" | "2020";
  isSelected: boolean;
}

export const League = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [league, setLeague] = useState<ILeaguesBySeason[]>([]);
  const [filters, setFilters] = useState<IFilter[]>([
    {
      season: "2022",
      isSelected: true,
    },
    {
      season: "2021",
      isSelected: false,
    },
    {
      season: "2020",
      isSelected: false,
    },
  ]);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchSeries = async () => {
      const selectedSeason = filters.find((filter) => filter.isSelected);
      setLoading(true);
      fetch(
        `https://api-football-v1.p.rapidapi.com/v3/leagues?season=${selectedSeason?.season}`,
        {
          headers: {
            "X-RapidAPI-Key":
              "71535109e2mshaeba54bcae6f51dp1c2a6fjsn6fef532752cf",
            "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
          },
        }
      )
        .then(async (response) => {
          const jsonResponse: ILeaguesBySeasonResponse = await response.json();
          setLeague(jsonResponse.response);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    };
    fetchSeries();
  }, [filters]);

  const renderItem = ({ item }: { item: ILeaguesBySeason }) => {
    return (
      <Pressable key={item.league.id} style={[styles.seriesCard]}
        onPress={() => {
          //@ts-ignore
          navigation.navigate("FixturesByLeague" , {league : item.league.id , season : item.seasons[0].year})
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <Text style={[styles.cardHeading]}>{item.league.name}</Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              marginLeft: 20,
            }}
          >
            <Image
              source={{ uri: item.league.logo }}
              style={{
                width: 50,
                height: 50,
              }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            width: "100%",
            marginTop: 10,
          }}
        >
          <Text>{`Start: ${item.seasons[0].start}`}</Text>
          <Text>{`End: ${item.seasons[0].end}`}</Text>
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
              {filter.season}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {loading ? (
        <Loader isVisible={loading} message="Loading season" />
      ) : (
        <FlatList
          data={league}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.league.id)}
        />
      )}
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
